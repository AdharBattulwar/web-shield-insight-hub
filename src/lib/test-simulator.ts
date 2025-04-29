
import { SecurityCheckStatus } from "@/components/dashboard/SecurityCheckItem";
import { ComplianceCheck } from "@/components/dashboard/ComplianceSection";
import { GradeType } from "@/components/dashboard/GradeScoreCard";

export interface TestResult {
  url: string;
  timestamp: string;
  grade: GradeType;
  score: number;
  domain: string;
  ip: string;
  securityHeaders: ComplianceCheck[];
  pciCompliance: ComplianceCheck[];
  gdprCompliance: ComplianceCheck[];
  testDuration: number;
}

// Mock data for security headers
const securityHeadersData = [
  {
    id: "csp",
    title: "Content-Security-Policy",
    description: "Prevents XSS attacks by specifying which dynamic resources are allowed to load",
  },
  {
    id: "xframe",
    title: "X-Frame-Options",
    description: "Protects against clickjacking attacks",
  },
  {
    id: "hsts",
    title: "Strict-Transport-Security",
    description: "Forces secure connections to the site via HTTPS",
  },
  {
    id: "xss",
    title: "X-XSS-Protection",
    description: "Enables the built-in XSS filter in browsers",
  },
  {
    id: "nosniff",
    title: "X-Content-Type-Options",
    description: "Prevents MIME type sniffing",
  },
];

// Mock data for PCI compliance
const pciComplianceData = [
  {
    id: "ssl",
    title: "SSL/TLS Encryption",
    description: "Uses secure protocols and strong ciphers",
  },
  {
    id: "patching",
    title: "Security Patches",
    description: "System has recent security updates",
  },
  {
    id: "firewalls",
    title: "Web Firewall Status",
    description: "Detects presence of WAF protection",
  },
];

// Mock data for GDPR compliance
const gdprComplianceData = [
  {
    id: "cookies",
    title: "Cookie Consent",
    description: "Proper consent mechanism for cookies",
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    description: "Detected privacy policy page",
  },
  {
    id: "breach",
    title: "Data Breach Notification",
    description: "Has documented data breach process",
  },
];

// Random IP generator between ranges
function generateRandomIP(): string {
  const octet = () => Math.floor(Math.random() * 255) + 1;
  return `${octet()}.${octet()}.${octet()}.${octet()}`;
}

// Simulation function for test results
export async function simulateWebsiteTest(url: string): Promise<TestResult> {
  // Extract domain for display
  let domain = "";
  try {
    domain = new URL(url).hostname;
  } catch (e) {
    domain = url.replace(/^https?:\/\//, "").split("/")[0];
  }

  // Simulate a test with some randomization
  const startTime = Date.now();
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
  
  const testDuration = (Date.now() - startTime) / 1000;

  // Randomize test results
  const headersScore = Math.random();
  const pciScore = Math.random();
  const gdprScore = Math.random();

  // Calculate overall score (0-100)
  const score = Math.floor(((headersScore + pciScore + gdprScore) / 3) * 100);
  
  // Determine grade
  let grade: GradeType;
  if (score >= 90) grade = "A";
  else if (score >= 80) grade = "B";
  else if (score >= 70) grade = "C";
  else if (score >= 60) grade = "D";
  else grade = "F";

  // Generate security header results
  const securityHeaders = securityHeadersData.map(header => {
    const rand = Math.random();
    let status: SecurityCheckStatus = "na";
    
    if (rand > 0.7) status = "pass";
    else if (rand > 0.5) status = "warning";
    else if (rand > 0.3) status = "fail";
    else status = "info";
    
    return { ...header, status };
  });

  // Generate PCI compliance results
  const pciCompliance = pciComplianceData.map(item => {
    const rand = Math.random();
    const status: SecurityCheckStatus = rand > 0.6 ? "pass" : rand > 0.3 ? "warning" : "fail";
    return { ...item, status };
  });

  // Generate GDPR compliance results
  const gdprCompliance = gdprComplianceData.map(item => {
    const rand = Math.random();
    const status: SecurityCheckStatus = rand > 0.5 ? "pass" : "fail";
    return { ...item, status };
  });

  return {
    url,
    timestamp: new Date().toISOString(),
    grade,
    score,
    domain,
    ip: generateRandomIP(),
    securityHeaders,
    pciCompliance,
    gdprCompliance,
    testDuration,
  };
}
