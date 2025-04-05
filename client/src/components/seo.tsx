interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  type?: 'website' | 'article';
  imageUrl?: string;
  imageAlt?: string;
  noindex?: boolean;
}

export default function SEO({
  title = 'Totrakool Khongsap | AI Strategist',
  description = 'Totrakool Khongsap - AI Strategist blending data science, finance, and leadership to transform business with AI-driven innovation.',
  canonicalUrl,
  type = 'website',
  imageUrl,
  imageAlt = 'Totrakool Khongsap - AI Strategist',
  noindex = false,
}: SEOProps) {
  const baseUrl = 'https://totrakoolkhongsap.replit.app'; // Update this with your actual domain

  // Determine the canonical URL
  const canonical = canonicalUrl ? `${baseUrl}${canonicalUrl}` : undefined;
  
  // Ensure title ends with site name
  const fullTitle = title.includes('Totrakool Khongsap') ? title : `${title} | Totrakool Khongsap`;
  
  // Create document title - this will update the browser tab title
  document.title = fullTitle;
  
  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description);
  }
  
  // Update OG Title
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', fullTitle);
  }
  
  // Update OG Description
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute('content', description);
  }
  
  // Update OG Type
  const ogType = document.querySelector('meta[property="og:type"]');
  if (ogType) {
    ogType.setAttribute('content', type);
  }
  
  // Set or create canonical link
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);
  } else if (canonicalLink) {
    canonicalLink.remove();
  }
  
  // Set or update image
  let ogImage = document.querySelector('meta[property="og:image"]');
  if (imageUrl) {
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
    }
    ogImage.setAttribute('content', imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`);
    
    // Add image alt
    let ogImageAlt = document.querySelector('meta[property="og:image:alt"]');
    if (!ogImageAlt) {
      ogImageAlt = document.createElement('meta');
      ogImageAlt.setAttribute('property', 'og:image:alt');
      document.head.appendChild(ogImageAlt);
    }
    ogImageAlt.setAttribute('content', imageAlt);
  } else if (ogImage) {
    ogImage.remove();
    const ogImageAlt = document.querySelector('meta[property="og:image:alt"]');
    if (ogImageAlt) ogImageAlt.remove();
  }
  
  // Set robots meta tag for noindex
  let robotsTag = document.querySelector('meta[name="robots"]');
  if (noindex) {
    if (!robotsTag) {
      robotsTag = document.createElement('meta');
      robotsTag.setAttribute('name', 'robots');
      document.head.appendChild(robotsTag);
    }
    robotsTag.setAttribute('content', 'noindex, nofollow');
  } else if (robotsTag) {
    robotsTag.setAttribute('content', 'index, follow');
  }
  
  // Return null as this component doesn't render anything visible
  return null;
}