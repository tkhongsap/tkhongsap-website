interface SchemaMarkupProps {
  type: 'person' | 'article' | 'professionalService' | 'website' | 'faq' | 'breadcrumb' | 'project';
  data: Record<string, any>;
}

export default function SchemaMarkup({ type, data }: SchemaMarkupProps) {
  let schemaData = {};
  const baseUrl = 'https://tkhongsap.io'; // Updated to match the domain from SEO report
  
  switch (type) {
    case 'person':
      schemaData = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: data.name || 'Ta Khongsap',
        url: data.url || baseUrl,
        jobTitle: data.jobTitle || 'Builder | AI Agent Systems | Solopreneur',
        description: data.description || 'Builder based in Bangkok. Running AI agent systems that ship code, draft content, and manage workflows autonomously.',
        sameAs: data.sameAs || ['https://x.com/tkhongsap', 'https://www.linkedin.com/in/totrakool-khongsap/', 'https://github.com/tkhongsap'],
        alumniOf: data.alumniOf,
        knowsAbout: data.knowsAbout || ['AI Agents', 'OpenClaw', 'Building in Public', 'Data Science', 'Supply Chain'],
        // Add more personal attributes as needed
        ...(data.image && { image: data.image }),
        ...(data.email && { email: data.email }),
        ...(data.worksFor && { worksFor: data.worksFor }),
      };
      break;
      
    case 'article':
      schemaData = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data.title,
        description: data.description,
        image: data.image || `${baseUrl}/default-article-image.jpg`,
        datePublished: data.date,
        dateModified: data.modified || data.date,
        author: {
          '@type': 'Person',
          name: data.author || 'Totrakool Khongsap',
          url: baseUrl
        },
        publisher: {
          '@type': 'Person',
          name: 'Totrakool Khongsap',
          logo: {
            '@type': 'ImageObject',
            url: data.logo || `${baseUrl}/favicon.svg`,
            width: '512',
            height: '512'
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': data.url || `${baseUrl}/writing`
        },
        keywords: data.keywords || 'AI Strategy, Data Science, Machine Learning, Business Intelligence',
        articleSection: data.categories || 'AI Strategy'
      };
      break;
      
    case 'professionalService':
      schemaData = {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: data.name || 'Totrakool Khongsap - AI Strategic Services',
        description: data.description || 'AI strategy and consulting services to help businesses leverage AI for competitive advantage',
        url: data.url || baseUrl,
        logo: data.logo || `${baseUrl}/favicon.svg`,
        image: data.image,
        provider: {
          '@type': 'Person',
          name: 'Totrakool Khongsap',
          url: baseUrl
        },
        serviceType: data.serviceType || ['AI Strategy', 'Data Science', 'Business Intelligence', 'Machine Learning Consulting'],
        areaServed: data.areaServed || 'Worldwide',
        priceRange: data.priceRange,
        telephone: data.telephone,
        email: data.email,
        hasOfferCatalog: data.hasOfferCatalog ? {
          '@type': 'OfferCatalog',
          name: 'AI Services',
          itemListElement: data.services || []
        } : undefined
      };
      break;
      
    case 'website':
      schemaData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        url: data.url || baseUrl,
        name: data.name || 'Ta Khongsap | Building AI Systems That Ship',
        description: data.description || 'Builder based in Bangkok. AI agent systems, products, and building in public.',
        author: {
          '@type': 'Person',
          name: 'Totrakool Khongsap',
          url: baseUrl
        },
        publisher: {
          '@type': 'Person',
          name: 'Totrakool Khongsap',
          url: baseUrl
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${baseUrl}/search?q={search_term_string}`
          },
          'query-input': 'required name=search_term_string'
        }
      };
      break;
      
    case 'faq':
      schemaData = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: data.questions.map((q: any) => ({
          '@type': 'Question',
          name: q.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: q.answer
          }
        }))
      };
      break;
      
    case 'breadcrumb':
      schemaData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: data.items.map((item: any, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
        }))
      };
      break;
      
    case 'project':
      schemaData = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: data.title,
        description: data.description,
        image: data.image,
        creator: {
          '@type': 'Person',
          name: 'Totrakool Khongsap',
          url: baseUrl
        },
        dateCreated: data.dateCreated,
        keywords: data.technologies ? data.technologies.join(', ') : undefined,
        url: data.url || `${baseUrl}/portfolio`,
        ...(data.codeRepository && { codeRepository: data.codeRepository }),
        ...(data.sameAs && { sameAs: data.sameAs }),
        ...(data.category && { genre: data.category })
      };
      break;
  }
  
  return (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}