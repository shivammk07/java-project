export interface CategoryScore {
  score: number;
  feedback: string;
  status: 'good' | 'warning' | 'critical';
}

export interface CriticalFix {
  title: string;
  section: string;
  issue: string;
  recommendation: string;
  priority: 'high' | 'medium' | 'low';
}

export interface BulletEnhancement {
  original: string;
  improved: string;
  explanation: string;
  impactCategory: string;
}

export interface SectionEvaluation {
  sectionName: string;
  rating: 'excellent' | 'adequate' | 'needs_work';
  positiveNotes: string;
  improvements: string;
}

export interface AtsChecklistItem {
  item: string;
  passed: boolean;
  details: string;
}

export interface ResumeAnalysis {
  candidateName?: string;
  detectedRole?: string;
  targetRoleMatch?: string;
  overallScore: number;
  scoreLabel: 'Exceptional' | 'Competitive' | 'Needs Optimization' | 'Critical Attention' | string;
  executiveSummary: string;
  categoryScores: {
    atsParsability: CategoryScore;
    quantifiableImpact: CategoryScore;
    actionVerbs: CategoryScore;
    keywordMatch: CategoryScore;
    formattingReadability: CategoryScore;
  };
  strengths: string[];
  weaknesses: string[];
  criticalFixes: CriticalFix[];
  bulletEnhancements: BulletEnhancement[];
  keywordAnalysis: {
    matchedKeywords: string[];
    missingCrucialKeywords: string[];
    recommendedAdditions: string[];
    jobDescriptionMatchPercentage?: number;
  };
  sectionEvaluations: SectionEvaluation[];
  atsComplianceChecklist: AtsChecklistItem[];
  estimatedYoe?: string;
  topSkillsIdentified: string[];
  analysisTimeMs?: number;
  detectedFormat?: string;
  cached?: boolean;
}

export type ResumeFormatType = 'text' | 'photo' | 'pdf' | 'docx';

export interface SampleResume {
  id: string;
  name: string;
  role: string;
  level: string;
  tagline: string;
  formatType: ResumeFormatType;
  formatBadge: string;
  visualStyle: 'clean-pdf' | 'camera-photo' | 'executive-docx' | 'plain-text';
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  resumeText: string;
  targetJobTitle: string;
  targetJobDescription: string;
  precomputedAnalysis?: ResumeAnalysis;
}

