
import { collection, getDocs, query, orderBy, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export type IndustryProject = {
  id: string;
  title: string;
  description: string;
  image: string;
  hint: string;
  category: string;
  technologies: string[];
  duration: string;
  client: string;
  results: string[];
};

export type Industry = {
  id: string;
  name: string;
  slug: string;
  image: string;
  hint: string;
  icon: string; // lucide-react icon name
  description: string;
  overview: string;
  challenges: string[];
  solutions: string[];
  benefits: string[];
  projects?: IndustryProject[];
};

const industriesCollection = collection(db, 'industries');

// Mock data for industries with projects
const mockIndustries: Industry[] = [
  {
    id: '1',
    name: 'Healthcare',
    slug: 'healthcare',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop',
    hint: 'modern hospital, medical technology, healthcare professionals',
    icon: 'Heart',
    description: 'Comprehensive digital solutions for healthcare providers, hospitals, and medical practices.',
    overview: 'We specialize in developing secure, HIPAA-compliant healthcare solutions that improve patient care, streamline operations, and enhance medical practice efficiency.',
    challenges: [
      'Patient data security and privacy compliance',
      'Integration with existing medical systems',
      'Real-time patient monitoring and alerts',
      'Appointment scheduling and management',
      'Electronic health records (EHR) systems'
    ],
    solutions: [
      'HIPAA-compliant patient management systems',
      'Telemedicine platforms with video consultation',
      'Electronic health records (EHR) integration',
      'Medical billing and insurance processing',
      'Patient portal with appointment booking'
    ],
    benefits: [
      'Improved patient care and satisfaction',
      'Reduced administrative overhead',
      'Enhanced data security and compliance',
      'Streamlined billing and insurance processes',
      'Better patient-doctor communication'
    ],
    projects: [
      {
        id: 'h1',
        title: 'MediCare Plus Patient Management System',
        description: 'Comprehensive patient management system with EHR integration, appointment scheduling, and billing automation.',
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop',
        hint: 'medical dashboard, patient records, healthcare technology',
        category: 'Patient Management',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'FHIR API'],
        duration: '8 months',
        client: 'Regional Medical Center',
        results: [
          '40% reduction in appointment scheduling time',
          '60% improvement in patient data accuracy',
          '25% increase in patient satisfaction scores'
        ]
      },
      {
        id: 'h2',
        title: 'TeleMed Connect Platform',
        description: 'Secure telemedicine platform enabling remote consultations with integrated prescription management.',
        image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=400&fit=crop',
        hint: 'telemedicine, video call, doctor consultation, remote healthcare',
        category: 'Telemedicine',
        technologies: ['Vue.js', 'WebRTC', 'Express.js', 'MongoDB'],
        duration: '6 months',
        client: 'City Health Network',
        results: [
          '300% increase in remote consultations',
          '50% reduction in no-show appointments',
          '35% cost savings in operational expenses'
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Manufacturing',
    slug: 'manufacturing',
    image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&h=400&fit=crop',
    hint: 'modern factory, industrial automation',
    icon: 'Factory',
    description: 'Smart manufacturing solutions that optimize production, reduce costs, and improve quality control.',
    overview: 'Our manufacturing solutions leverage IoT, AI, and automation to create smart factories that maximize efficiency, minimize waste, and ensure quality control.',
    challenges: [
      'Production line optimization and efficiency',
      'Quality control and defect detection',
      'Inventory management and supply chain',
      'Equipment maintenance and downtime',
      'Real-time production monitoring'
    ],
    solutions: [
      'IoT-enabled production monitoring systems',
      'AI-powered quality control and inspection',
      'Predictive maintenance platforms',
      'Supply chain management systems',
      'Real-time dashboard and analytics'
    ],
    benefits: [
      'Increased production efficiency',
      'Reduced operational costs',
      'Improved product quality',
      'Minimized equipment downtime',
      'Better supply chain visibility'
    ],
    projects: [
      {
        id: 'm1',
        title: 'SmartFactory Production Monitor',
        description: 'IoT-based production monitoring system with real-time analytics and predictive maintenance.',
        image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&h=400&fit=crop',
        hint: 'smart factory, industrial IoT, production monitoring dashboard',
        category: 'Production Monitoring',
        technologies: ['React', 'Python', 'InfluxDB', 'MQTT'],
        duration: '10 months',
        client: 'AutoParts Manufacturing Co.',
        results: [
          '30% increase in production efficiency',
          '45% reduction in equipment downtime',
          '20% decrease in maintenance costs'
        ]
      },
      {
        id: 'm2',
        title: 'QualityVision AI Inspector',
        description: 'AI-powered visual inspection system for automated quality control and defect detection.',
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop',
        hint: 'AI inspection, quality control, automated manufacturing',
        category: 'Quality Control',
        technologies: ['Python', 'TensorFlow', 'OpenCV', 'FastAPI'],
        duration: '7 months',
        client: 'Precision Electronics Ltd.',
        results: [
          '95% accuracy in defect detection',
          '60% reduction in manual inspection time',
          '25% improvement in product quality'
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Retail & E-commerce',
    slug: 'retail-ecommerce',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    hint: 'modern retail store, e-commerce',
    icon: 'ShoppingBag',
    description: 'Complete e-commerce solutions and retail management systems that drive sales and customer engagement.',
    overview: 'We create powerful e-commerce platforms and retail management systems that enhance customer experience, streamline operations, and boost sales.',
    challenges: [
      'Multi-channel sales integration',
      'Inventory management across locations',
      'Customer experience optimization',
      'Payment processing and security',
      'Order fulfillment and logistics'
    ],
    solutions: [
      'Custom e-commerce platforms',
      'Point-of-sale (POS) systems',
      'Inventory management solutions',
      'Customer relationship management (CRM)',
      'Analytics and reporting dashboards'
    ],
    benefits: [
      'Increased online and offline sales',
      'Better customer insights and engagement',
      'Streamlined inventory management',
      'Improved operational efficiency',
      'Enhanced customer experience'
    ],
    projects: [
      {
        id: 'r1',
        title: 'FashionHub E-commerce Platform',
        description: 'Multi-vendor e-commerce platform with advanced search, personalization, and mobile optimization.',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
        hint: 'fashion e-commerce, online shopping',
        category: 'E-commerce Platform',
        technologies: ['Next.js', 'Shopify Plus', 'Stripe', 'Algolia'],
        duration: '9 months',
        client: 'Fashion Retail Group',
        results: [
          '150% increase in online sales',
          '40% improvement in conversion rate',
          '65% increase in mobile transactions'
        ]
      },
      {
        id: 'r2',
        title: 'RetailPro POS System',
        description: 'Cloud-based point-of-sale system with inventory tracking and customer loyalty integration.',
        image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=600&h=400&fit=crop',
        hint: 'retail POS, point of sale system',
        category: 'Point of Sale',
        technologies: ['React Native', 'Node.js', 'PostgreSQL', 'Square API'],
        duration: '5 months',
        client: 'Metro Retail Chain',
        results: [
          '50% faster checkout process',
          '30% increase in customer loyalty enrollment',
          '25% reduction in inventory discrepancies'
        ]
      }
    ]
  },
  {
    id: '4',
    name: 'Finance & Banking',
    slug: 'finance-banking',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    hint: 'modern banking, financial technology',
    icon: 'Banknote',
    description: 'Secure financial technology solutions for banks, fintech companies, and financial institutions.',
    overview: 'We develop secure, compliant financial solutions including mobile banking, payment processing, and wealth management platforms.',
    challenges: [
      'Regulatory compliance and security',
      'Real-time transaction processing',
      'Fraud detection and prevention',
      'Customer onboarding and KYC',
      'Mobile banking and digital payments'
    ],
    solutions: [
      'Mobile banking applications',
      'Payment gateway integration',
      'Fraud detection systems',
      'Regulatory compliance tools',
      'Wealth management platforms'
    ],
    benefits: [
      'Enhanced security and compliance',
      'Improved customer experience',
      'Faster transaction processing',
      'Reduced operational costs',
      'Better risk management'
    ],
    projects: [
      {
        id: 'f1',
        title: 'SecureBank Mobile App',
        description: 'Feature-rich mobile banking app with biometric authentication and real-time notifications.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
        hint: 'mobile banking app, financial technology, digital banking',
        category: 'Mobile Banking',
        technologies: ['React Native', 'Node.js', 'MongoDB', 'Plaid API'],
        duration: '12 months',
        client: 'Community First Bank',
        results: [
          '80% increase in mobile banking adoption',
          '45% reduction in branch visits',
          '90% customer satisfaction rating'
        ]
      },
      {
        id: 'f2',
        title: 'FraudGuard Detection System',
        description: 'AI-powered fraud detection system with real-time transaction monitoring and risk assessment.',
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
        hint: 'fraud detection, cybersecurity, financial security, data analytics',
        category: 'Fraud Detection',
        technologies: ['Python', 'TensorFlow', 'Apache Kafka', 'Redis'],
        duration: '8 months',
        client: 'Regional Credit Union',
        results: [
          '75% reduction in fraudulent transactions',
          '99.2% accuracy in fraud detection',
          '$2M+ in prevented losses annually'
        ]
      }
    ]
  },
  {
    id: '5',
    name: 'Construction',
    slug: 'construction',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop',
    hint: 'construction site, building, architecture',
    icon: 'Building',
    description: 'Digital solutions for construction companies, project management, and building automation systems.',
    overview: 'We provide comprehensive construction technology solutions that streamline project management, improve safety, enhance collaboration, and optimize resource allocation across all phases of construction projects.',
    challenges: [
      'Project timeline and budget management',
      'Safety compliance and incident tracking',
      'Resource allocation and equipment management',
      'Communication between stakeholders',
      'Quality control and inspection processes',
      'Document management and version control'
    ],
    solutions: [
      'Construction project management platforms',
      'Safety monitoring and compliance systems',
      'Equipment tracking and maintenance solutions',
      'Collaboration tools for teams and stakeholders',
      'Quality assurance and inspection apps',
      'Document management and BIM integration'
    ],
    benefits: [
      'Improved project delivery timelines',
      'Enhanced safety and compliance',
      'Better resource utilization',
      'Streamlined communication',
      'Reduced project costs',
      'Higher quality deliverables'
    ],
    projects: [
      {
        id: 'c1',
        title: 'BuildTrack Project Management Suite',
        description: 'Comprehensive construction project management platform with timeline tracking, resource allocation, and real-time collaboration.',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop',
        hint: 'construction management, project dashboard',
        category: 'Project Management',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'WebSocket'],
        duration: '12 months',
        client: 'Metro Construction Group',
        results: [
          '25% reduction in project completion time',
          '40% improvement in budget accuracy',
          '60% decrease in communication delays'
        ]
      },
      {
        id: 'c2',
        title: 'SafeSite Monitoring System',
        description: 'IoT-based safety monitoring system with real-time alerts, incident tracking, and compliance reporting.',
        image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop',
        hint: 'construction safety, monitoring system',
        category: 'Safety Management',
        technologies: ['IoT Sensors', 'Python', 'React', 'InfluxDB'],
        duration: '8 months',
        client: 'SafeBuild Construction',
        results: [
          '70% reduction in safety incidents',
          '100% compliance with safety regulations',
          '50% faster incident response time'
        ]
      }
    ]
  },
  {
    id: '6',
    name: 'Tourism & Travel',
    slug: 'tourism-travel',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop',
    hint: 'travel, tourism, vacation, destination',
    icon: 'Plane',
    description: 'Innovative travel and tourism solutions including booking platforms, destination management, and customer experience systems.',
    overview: 'We create cutting-edge tourism technology solutions that enhance traveler experiences, streamline operations for tourism businesses, and provide comprehensive destination management systems.',
    challenges: [
      'Online booking and reservation management',
      'Customer experience personalization',
      'Multi-channel distribution and pricing',
      'Inventory management across properties',
      'Real-time availability and updates',
      'Payment processing and security'
    ],
    solutions: [
      'Travel booking and reservation platforms',
      'Customer relationship management systems',
      'Dynamic pricing and revenue management',
      'Property and inventory management tools',
      'Mobile travel companion apps',
      'Analytics and business intelligence dashboards'
    ],
    benefits: [
      'Increased booking conversions',
      'Enhanced customer satisfaction',
      'Optimized pricing strategies',
      'Streamlined operations',
      'Better inventory utilization',
      'Data-driven decision making'
    ],
    projects: [
      {
        id: 't1',
        title: 'TravelHub Booking Platform',
        description: 'Multi-vendor travel booking platform with real-time availability, dynamic pricing, and personalized recommendations.',
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop',
        hint: 'travel booking, vacation planning',
        category: 'Booking Platform',
        technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe API'],
        duration: '10 months',
        client: 'Global Travel Network',
        results: [
          '200% increase in online bookings',
          '45% improvement in conversion rate',
          '35% increase in average booking value'
        ]
      },
      {
        id: 't2',
        title: 'DestinationPro Management System',
        description: 'Comprehensive destination management system for tourism boards with visitor analytics and marketing tools.',
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop',
        hint: 'destination management, tourism analytics',
        category: 'Destination Management',
        technologies: ['Vue.js', 'Laravel', 'MySQL', 'Google Analytics API'],
        duration: '9 months',
        client: 'Regional Tourism Board',
        results: [
          '150% increase in visitor engagement',
          '80% improvement in marketing ROI',
          '60% better resource allocation'
        ]
      }
    ]
  },
  {
    id: '7',
    name: 'Restaurant & Cafe',
    slug: 'restaurant-cafe',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
    hint: 'restaurant, cafe, dining, food service',
    icon: 'ChefHat',
    description: 'Complete restaurant management solutions including POS systems, online ordering, inventory management, and customer engagement platforms.',
    overview: 'We develop comprehensive restaurant technology solutions that enhance dining experiences, streamline operations, manage inventory efficiently, and boost customer loyalty for restaurants and cafes.',
    challenges: [
      'Order management and kitchen operations',
      'Inventory tracking and waste reduction',
      'Customer loyalty and engagement',
      'Online ordering and delivery integration',
      'Staff scheduling and payroll management',
      'Table reservation and waitlist management'
    ],
    solutions: [
      'Point-of-sale (POS) and order management systems',
      'Inventory management and cost control tools',
      'Customer loyalty and rewards programs',
      'Online ordering and delivery platforms',
      'Staff management and scheduling systems',
      'Table reservation and customer management'
    ],
    benefits: [
      'Faster order processing and service',
      'Reduced food waste and costs',
      'Increased customer retention',
      'Higher online order volume',
      'Optimized staff productivity',
      'Better table turnover rates'
    ],
    projects: [
      {
        id: 'r1',
        title: 'RestaurantPro POS System',
        description: 'Cloud-based restaurant POS system with kitchen display, inventory tracking, and integrated payment processing.',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
        hint: 'restaurant POS, kitchen management',
        category: 'POS System',
        technologies: ['React Native', 'Node.js', 'PostgreSQL', 'Square API'],
        duration: '7 months',
        client: 'Urban Dining Group',
        results: [
          '40% faster order processing',
          '30% reduction in food waste',
          '25% increase in table turnover'
        ]
      },
      {
        id: 'r2',
        title: 'CafeConnect Loyalty Platform',
        description: 'Mobile-first customer loyalty platform with rewards, personalized offers, and social media integration.',
        image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&h=400&fit=crop',
        hint: 'cafe loyalty app, customer rewards',
        category: 'Customer Loyalty',
        technologies: ['Flutter', 'Firebase', 'Node.js', 'SendGrid'],
        duration: '5 months',
        client: 'Artisan Coffee Chain',
        results: [
          '300% increase in repeat customers',
          '50% growth in mobile app usage',
          '35% increase in average order value'
        ]
      }
    ]
  }
];

export async function getAllIndustries(): Promise<Industry[]> {
  try {
    // For now, prioritize mock data since it has complete information
    // In production, you would merge Firestore data with mock data or ensure Firestore has complete data
    return mockIndustries;

    // Commented out Firestore logic for now
    /*
    const q = query(industriesCollection, orderBy('name'));
    const industriesSnapshot = await getDocs(q);
    if (industriesSnapshot.empty) {
      console.log('No industries found in Firestore, using mock data.');
      return mockIndustries;
    }
    const industriesList = industriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Industry[];
    return industriesList;
    */
  } catch (error) {
    console.error("Error fetching industries: ", error);
    return mockIndustries; // Return mock data on error
  }
}

export async function getIndustryBySlug(slug: string): Promise<Industry | null> {
  try {
    // First try to find in Firestore
    const q = query(industriesCollection);
    const industriesSnapshot = await getDocs(q);

    if (!industriesSnapshot.empty) {
      const industries = industriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Industry[];
      const industry = industries.find(ind => ind.slug === slug);
      if (industry) return industry;
    }

    // Fallback to mock data
    const industry = mockIndustries.find(ind => ind.slug === slug);
    return industry || null;
  } catch (error) {
    console.error("Error fetching industry: ", error);
    // Fallback to mock data
    const industry = mockIndustries.find(ind => ind.slug === slug);
    return industry || null;
  }
}
