interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  type?: 'website' | 'article';
  imageUrl?: string;
  imageAlt?: string;
  noindex?: boolean;
  keywords?: string;
  pageUrl?: string;
}

export default function SEO({
  title = 'Ta Khongsap | Math • Code • Finance',
  description = 'Ta Khongsap - Mathematician and Software Developer leveraging mathematical rigor, programming expertise, and finance domain knowledge to solve complex problems with AI and data science.',
  canonicalUrl,
  type = 'website',
  imageUrl,
  imageAlt = 'Ta Khongsap - Mathematician & Software Developer',
  noindex = false,
  keywords = 'mathematics, software development, finance, AI, data science, machine learning, quantitative analysis, algorithmic trading, financial modeling, domain expertise',
  pageUrl,
}: SEOProps) {
  const baseUrl = 'https://tkhongsap.io'; // Updated with the actual domain from SEO report
  
  // Determine the canonical URL
  const canonical = canonicalUrl ? `${baseUrl}${canonicalUrl}` : undefined;
  const currentUrl = pageUrl ? `${baseUrl}${pageUrl}` : baseUrl;
  
  // Ensure title ends with site name
  const fullTitle = title.includes('Ta Khongsap') ? title : `${title} | Ta Khongsap`;
  
  // Create document title - this will update the browser tab title
  document.title = fullTitle;
  
  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description);
  } else {
    const newMetaDescription = document.createElement('meta');
    newMetaDescription.setAttribute('name', 'description');
    newMetaDescription.setAttribute('content', description);
    document.head.appendChild(newMetaDescription);
  }
  
  // Update meta keywords
  let metaKeywords = document.querySelector('meta[name="keywords"]');
  if (!metaKeywords) {
    metaKeywords = document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    document.head.appendChild(metaKeywords);
  }
  metaKeywords.setAttribute('content', keywords);
  
  // Update OG Title
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', fullTitle);
  } else {
    const newOgTitle = document.createElement('meta');
    newOgTitle.setAttribute('property', 'og:title');
    newOgTitle.setAttribute('content', fullTitle);
    document.head.appendChild(newOgTitle);
  }
  
  // Update OG Description
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute('content', description);
  } else {
    const newOgDescription = document.createElement('meta');
    newOgDescription.setAttribute('property', 'og:description');
    newOgDescription.setAttribute('content', description);
    document.head.appendChild(newOgDescription);
  }
  
  // Update OG Type
  const ogType = document.querySelector('meta[property="og:type"]');
  if (ogType) {
    ogType.setAttribute('content', type);
  } else {
    const newOgType = document.createElement('meta');
    newOgType.setAttribute('property', 'og:type');
    newOgType.setAttribute('content', type);
    document.head.appendChild(newOgType);
  }
  
  // Set or create OG URL
  let ogUrl = document.querySelector('meta[property="og:url"]');
  if (!ogUrl) {
    ogUrl = document.createElement('meta');
    ogUrl.setAttribute('property', 'og:url');
    document.head.appendChild(ogUrl);
  }
  ogUrl.setAttribute('content', currentUrl);
  
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
    
    // Add image dimensions if available
    let ogImageWidth = document.querySelector('meta[property="og:image:width"]');
    if (!ogImageWidth) {
      ogImageWidth = document.createElement('meta');
      ogImageWidth.setAttribute('property', 'og:image:width');
      ogImageWidth.setAttribute('content', '1200');
      document.head.appendChild(ogImageWidth);
    }
    
    let ogImageHeight = document.querySelector('meta[property="og:image:height"]');
    if (!ogImageHeight) {
      ogImageHeight = document.createElement('meta');
      ogImageHeight.setAttribute('property', 'og:image:height');
      ogImageHeight.setAttribute('content', '630');
      document.head.appendChild(ogImageHeight);
    }
  } else if (ogImage) {
    ogImage.remove();
    const ogImageAlt = document.querySelector('meta[property="og:image:alt"]');
    if (ogImageAlt) ogImageAlt.remove();
  }
  
  // Twitter card meta tags
  let twitterCard = document.querySelector('meta[name="twitter:card"]');
  if (!twitterCard) {
    twitterCard = document.createElement('meta');
    twitterCard.setAttribute('name', 'twitter:card');
    twitterCard.setAttribute('content', 'summary_large_image');
    document.head.appendChild(twitterCard);
  }
  
  let twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (!twitterTitle) {
    twitterTitle = document.createElement('meta');
    twitterTitle.setAttribute('name', 'twitter:title');
    document.head.appendChild(twitterTitle);
  }
  twitterTitle.setAttribute('content', fullTitle);
  
  let twitterDescription = document.querySelector('meta[name="twitter:description"]');
  if (!twitterDescription) {
    twitterDescription = document.createElement('meta');
    twitterDescription.setAttribute('name', 'twitter:description');
    document.head.appendChild(twitterDescription);
  }
  twitterDescription.setAttribute('content', description);
  
  if (imageUrl) {
    let twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (!twitterImage) {
      twitterImage = document.createElement('meta');
      twitterImage.setAttribute('name', 'twitter:image');
      document.head.appendChild(twitterImage);
    }
    twitterImage.setAttribute('content', imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`);
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
    robotsTag.setAttribute('content', 'index, follow, max-image-preview:large');
  } else {
    robotsTag = document.createElement('meta');
    robotsTag.setAttribute('name', 'robots');
    robotsTag.setAttribute('content', 'index, follow, max-image-preview:large');
    document.head.appendChild(robotsTag);
  }
  
  // Return null as this component doesn't render anything visible
  return null;
}