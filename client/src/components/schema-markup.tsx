interface SchemaMarkupProps {
  type: 'person' | 'article' | 'professionalService' | 'website';
  data: Record<string, any>;
}

export default function SchemaMarkup({ type, data }: SchemaMarkupProps) {
  let schemaData = {};
  
  switch (type) {
    case 'person':
      schemaData = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: data.name || 'Totrakool Khongsap',
        url: data.url || 'https://totrakoolkhongsap.replit.app',
        jobTitle: data.jobTitle || 'AI Strategist',
        description: data.description || 'AI Strategist blending data science, finance, and leadership',
        sameAs: data.sameAs || [],
        // Add more personal attributes as needed
        ...(data.image && { image: data.image }),
        ...(data.email && { email: data.email }),
      };
      break;
      
    case 'article':
      schemaData = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data.title,
        description: data.description,
        image: data.image,
        datePublished: data.date,
        author: {
          '@type': 'Person',
          name: data.author || 'Totrakool Khongsap',
        },
        publisher: {
          '@type': 'Person',
          name: 'Totrakool Khongsap',
          logo: {
            '@type': 'ImageObject',
            url: data.logo || '/favicon.svg'
          }
        }
      };
      break;
      
    case 'professionalService':
      schemaData = {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: data.name || 'Totrakool Khongsap - AI Strategic Services',
        description: data.description || 'AI strategy and consulting services',
        provider: {
          '@type': 'Person',
          name: 'Totrakool Khongsap'
        },
        serviceType: data.serviceType || ['AI Strategy', 'Data Science', 'Business Intelligence'],
        areaServed: data.areaServed || 'Worldwide',
      };
      break;
      
    case 'website':
      schemaData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        url: data.url || 'https://totrakoolkhongsap.replit.app',
        name: data.name || 'Totrakool Khongsap | AI Strategist',
        description: data.description || 'Personal website of Totrakool Khongsap, AI Strategist',
        author: {
          '@type': 'Person',
          name: 'Totrakool Khongsap'
        }
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