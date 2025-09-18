document.addEventListener("DOMContentLoaded", () => {
    const pageName = window.location.pathname.split("/").pop().replace(".html", "");

    // Load shared settings on all pages
    loadContent('settings');

    // Determine which content file to load based on the current page
    const contentMap = {
        'homepage': 'homepage',
        'services_pricing': 'services',
        'customer_testimonials_portfolio': 'reviews',        
        'contact_service_areas': 'contact',
        'online_booking_system': 'booking'
    };

    if (contentMap[pageName]) {
        loadContent(contentMap[pageName]);
    }
});

async function loadContent(fileName) {
    try {
        const response = await fetch(`/content/${fileName}.md`);
        if (!response.ok) {
            // Silently fail if a content file for a page doesn't exist.
            console.warn(`Content file not found: /content/${fileName}.md`);
            return;
        }
        const mdText = await response.text();
        // Extract YAML frontmatter from markdown
        const frontmatterRegex = /^---([\s\S]*?)---/;
        const match = frontmatterRegex.exec(mdText);

        if (match && match[1]) {
            const yamlText = match[1];
            const data = jsyaml.load(yamlText);
            populateContent(data);
        } else {
            console.warn(`No YAML frontmatter found in /content/${fileName}.md`);
        }
    } catch (error) {
        console.error("Error loading or parsing content file:", error);
    }
}

function populateContent(data, prefix = '') {
    for (const key in data) {
        if (!data.hasOwnProperty(key)) continue;

        const value = data[key];
        const fullKey = prefix ? `${prefix}-${key}` : key;

        if (Array.isArray(value)) {
            // Special handling for booking services to update data attributes for the booking script
            if (fullKey === 'booking_services') {
                value.forEach((service, index) => {
                    const serviceCard = document.querySelector(`[data-cms-key='booking_services-${index}']`);
                    if (serviceCard) {
                        serviceCard.dataset.service = service.id;
                        serviceCard.dataset.price = service.price;
                        serviceCard.dataset.duration = service.duration;
                    }
                });
            }

            // Handle arrays by creating indexed keys, e.g., testimonials-0-quote
            value.forEach((item, index) => {
                const itemPrefix = `${fullKey}-${index}`;
                if (typeof item === 'object' && item !== null) {
                    populateContent(item, itemPrefix);
                }
            });
        } else if (typeof value === 'object' && value !== null) {
            // Handle nested objects
            populateContent(value, fullKey);
        } else {
            // Handle simple string/number/boolean values
            const elements = document.querySelectorAll(`[data-cms-key='${fullKey}']`);
            elements.forEach(el => {
                // Special handling for phone to update link and text
                if (fullKey === 'phone') {
                    el.textContent = value;
                    const phoneLink = el.closest('a');
                    if (phoneLink) {
                        phoneLink.href = `tel:${String(value).replace(/\s/g, '')}`;
                    }
                    return; // Skip to next element
                }

                if (el.tagName === 'IMG' || el.tagName === 'VIDEO' || el.tagName === 'SOURCE') {
                    const imagePath = String(value);
                    // If it's not an absolute URL, construct a relative path from the root.
                    // This handles pages in subdirectories like /home/ correctly.
                    if (!imagePath.startsWith('http') && !imagePath.startsWith('/')) {
                        // Assuming the path from CMS is relative to the project root.
                        el.src = `${window.location.origin}/${imagePath}`;
                    } else {
                        el.src = imagePath;
                    }
                } else if (el.tagName === 'A') {
                    el.href = value;
                } else {
                    // Use innerHTML for fields known to contain HTML, otherwise use textContent for safety.
                    const keysWithHtml = ['hero_title', 'title', 'subtitle'];
                    if (keysWithHtml.some(k => fullKey.startsWith(k))) {
                        el.innerHTML = value;
                    } else {
                        // Safely update text content without destroying child elements like icons.
                        // This is the key fix for the navbar issue.
                        el.textContent = value;
                    }
                }
            });
        }
    }
}