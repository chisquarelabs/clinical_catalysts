import { Questionnaire } from "../components/ui/wizard/questions/types";

export const questionnaire: Questionnaire = {
  id: "memory_assessment",
  title: "Memory Assessment Questionnaire",
  description:
    "Complete this assessment to help us understand your current condition",
  sections: [
    {
      id: "demographics",
      title: "Demographics",
      type: "form",
      questions: [
        {
          id: "demographics_name",
          text: "Please enter your name",
          type: "text",
          required: true,
          validation: {
            pattern: "^[A-Za-z ]+$",
            message: "Please enter valid first and last name",
          },
        },
        {
          id: "demographics_patientId",
          text: "Enter your Patient ID",
          type: "text",
          required: true,
          validation: {
            pattern: "^[A-Z][0-9]{4}$",
            message:
              "Patient ID must be 1 letter followed by 4 digits (e.g., A4857)",
          },
        },
        {
          id: "demographics_dob",
          text: "Enter your date of birth",
          type: "date",
          required: true,
        },
        {
          id: "demographics_sex",
          text: "What is your sex?",
          type: "radio",
          required: true,
          options: [
            { value: "M", label: "Male" },
            { value: "F", label: "Female" },
            { value: "LGBTQ", label: "LGBTQ+" },
          ],
        },
        {
          id: "demographics_ethnicity",
          text: "What is your ethnicity?",
          type: "radio",
          required: true,
          options: [
            { value: "asian", label: "Asian" },
            { value: "black", label: "Black" },
            { value: "mixed", label: "Mixed" },
            { value: "white", label: "White" },
            { value: "other", label: "Other" },
          ],
        },
      ],
      nextQuestion: {
        nextQuestionId: "social",
      },
    },
    {
      id: "social",
      title: "Social History",
      type: "form",
      questions: [
        {
          id: "social_qualification",
          text: "What is your highest qualification level?",
          type: "radio",
          required: true,
          options: [
            { value: "entry", label: "Entry Level" },
            { value: "level1-3", label: "Level 1-3" },
            { value: "level4-5", label: "Level 4-5" },
            { value: "level6-8", label: "Level 6-8" },
          ],
        },
        {
          id: "social_occupation",
          text: "What is your current occupation status?",
          type: "radio",
          required: true,
          options: [
            { value: "employed", label: "Employed" },
            { value: "unemployed", label: "Unemployed" },
            { value: "retired", label: "Retired" },
            { value: "others", label: "Others" },
          ],
        },
        {
          id: "social_learning_disabilities",
          text: "Do you have any learning disabilities?",
          type: "radio",
          required: true,
          options: [
            { value: "idd", label: "IDD" },
            { value: "down_syndrome", label: "Down Syndrome" },
            { value: "cerebral_palsy", label: "Cerebral Palsy" },
            { value: "multiple", label: "Multiple" },
            { value: "no", label: "No" },
          ],
        },
        {
          id: "social_smoker",
          text: "Are you a smoker?",
          type: "radio",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ],
        },
        {
          id: "social_alcoholic",
          text: "Do you consume alcohol?",
          type: "radio",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ],
        }
      ],
      nextQuestion: {
        conditions: [
          {
            value: {
              social_learning_disabilities: "no",
              social_smoker: "no",
              social_alcoholic: "no"
            },
            nextQuestionId: "medical"
          },
          {
            default: true,
            nextQuestionId: "end"
          }
        ]
      }
    },
    {
      id: "medical",
      title: "Medical History",
      type: "form",
      questions: [
        {
          id: "medical_hospitalization",
          text: "Have you been hospitalized in the past year?",
          type: "radio",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ]
        },
        {
          id: "medical_diabetic",
          text: "Are you diabetic?",
          type: "radio",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ]
        },
        {
          id: "medical_thyroid",
          text: "Do you have any thyroid conditions?",
          type: "radio",
          required: true,
          options: [
            { value: "hyperthyroidism", label: "Hyperthyroidism" },
            { value: "hypothyroidism", label: "Hypothyroidism" },
            { value: "no", label: "No" }
          ]
        },
        {
          id: "medical_cancer",
          text: "Do you have or had cancer?",
          type: "radio",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ]
        },
        {
          id: "medical_stroke",
          text: "Have you ever had a stroke or cerebrovascular attack?",
          type: "radio",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ]
        },
        {
          id: "medical_cardiac",
          text: "Do you have any cardiac problems?",
          type: "radio",
          required: true,
          options: [
            { value: "heart_attack", label: "Heart Attack" },
            { value: "angina", label: "Angina" },
            { value: "heart_failure", label: "Heart Failure" },
            { value: "no", label: "No" }
          ]
        },
        {
          id: "medical_head_injuries",
          text: "Have you experienced any head injuries?",
          type: "radio",
          required: true,
          options: [
            { value: "tbi", label: "Traumatic Brain Injury" },
            { value: "head_trauma", label: "Head Trauma" },
            { value: "concussions", label: "Concussions" },
            { value: "no", label: "No" }
          ]
        },
        {
          id: "medical_seizure",
          text: "Do you have seizures, epilepsy, or fits?",
          type: "radio",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ]
        },
        {
          id: "medical_renal",
          text: "Do you have any renal conditions?",
          type: "radio",
          required: true,
          options: [
            { value: "urinary_incontinence", label: "Urinary Incontinence" },
            { value: "ckd", label: "CKD" },
            { value: "nephrectomy", label: "Nephrectomy" },
            { value: "no", label: "No" }
          ]
        },
        {
          id: "medical_liver",
          text: "Do you have any liver conditions?",
          type: "radio",
          required: true,
          options: [
            { value: "fatty_liver", label: "Fatty Liver" },
            { value: "cirrhosis", label: "Liver Cirrhosis" },
            { value: "hepatitis", label: "Hepatitis B or C" },
            { value: "no", label: "No" }
          ]
        }
      ],
      nextQuestion: {
        conditions: [
          {
            value: {
              medical_head_injuries: "no",
              medical_seizure: "no",
              medical_renal: "no"
            },
            nextQuestionId: "functional"
          },
          {
            default: true,
            nextQuestionId: "end"
          }
        ]
      }
    },
    {
      id: "functional",
      title: "Functional Assessment",
      type: "form",
      questions: [
        {
          id: "functional_heading_personal",
          text: "Personal",
          type: "heading",
          category: "personal"
        },
        {
          id: "functional_clothes",
          text: "Do you require assistance for putting on clothes?",
          type: "radio",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ],
          category: "personal",
          scoring: {
            category: "personal",
            value: { yes: 1, no: -1 }
          }
        },
        {
          id: "functional_meals",
          text: "Do you take at least two meals everyday?",
          type: "radio",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ],
          category: "personal",
          scoring: {
            category: "personal",
            value: { yes: 1, no: -1 }
          }
        },
        {
          id: "functional_bedroom",
          text: "Do you keep your bedroom neat & clean?",
          type: "radio",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ],
          category: "personal",
          scoring: {
            category: "personal",
            value: { yes: 1, no: -1 }
          }
        },
        {
          id: "functional_heading_social",
          text: "Social",
          type: "heading",
          category: "social"
        },
        {
          id: "functional_support",
          text: "Do you have a support system on your own?",
          type: "radio",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ],
          category: "social",
          scoring: {
            category: "social",
            value: { yes: 1, no: -1 }
          }
        },
        {
          id: "functional_activities",
          text: "Do you engage in social activities?",
          type: "radio",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ],
          category: "social",
          scoring: {
            category: "social",
            value: { yes: 1, no: -1 }
          }
        },
        {
          id: "functional_conversations",
          text: "Are you able to respond to conversations properly?",
          type: "radio",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ],
          category: "social",
          scoring: {
            category: "social",
            value: { yes: 1, no: -1 }
          }
        },
        {
          id: "functional_heading_hobbies",
          text: "Hobbies and Interests",
          type: "heading",
          category: "hobbies"
        },
        {
          id: "functional_active",
          text: "Do you have any active hobbies?",
          type: "radio",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ],
          category: "hobbies",
          scoring: {
            category: "hobbies",
            value: { yes: 1, no: -1 }
          }
        },
        {
          id: "functional_engage",
          text: "Are you able to engage yourself in your hobbies?",
          type: "radio",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ],
          category: "hobbies",
          scoring: {
            category: "hobbies",
            value: { yes: 1, no: -1 }
          }
        },
        {
          id: "functional_heading_activities",
          text: "Activities and Engagement",
          type: "heading",
          category: "activities"
        },
        {
          id: "functional_transport",
          text: "Are you able to drive or use public transport on your own?",
          type: "radio",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ],
          category: "activities",
          scoring: {
            category: "activities",
            value: { yes: 1, no: -1 }
          }
        },
        {
          id: "functional_shopping",
          text: "Are you able to go for shopping alone?",
          type: "radio",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ],
          category: "activities",
          scoring: {
            category: "activities",
            value: { yes: 1, no: -1 }
          }
        },
        {
          id: "functional_sports",
          text: "Do you play any regular sports?",
          type: "radio",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ],
          category: "activities",
          scoring: {
            category: "activities",
            value: { yes: 1, no: -1 }
          }
        }
      ],
      nextQuestion: {
        nextQuestionId: "behavioral"
      }
    },
    {
      id: "behavioral",
      title: "Behavioral Assessment",
      type: "form",
      questions: [
        {
          id: "behavioral_suicide_attempt",
          text: "Have you ever tried committing suicide?",
          type: "radio",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ],
          category: "behavioral",
          scoring: {
            category: "behavioral",
            value: { yes: 1, no: -1 }
          }
        },
        {
          id: "behavioral_suicidal_thoughts",
          text: "Do you feel like killing yourself?",
          type: "radio",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ],
          category: "behavioral",
          scoring: {
            category: "behavioral",
            value: { yes: 1, no: -1 }
          }
        },
        {
          id: "behavioral_runaway",
          text: "Do you run away from your home quiet often?",
          type: "radio",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ],
          category: "behavioral",
          scoring: {
            category: "behavioral",
            value: { yes: 1, no: -1 }
          }
        },
        {
          id: "behavioral_scammed",
          text: "Have you been scammed anytime?",
          type: "radio",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ],
          category: "behavioral",
          scoring: {
            category: "behavioral",
            value: { yes: 1, no: -1 }
          }
        },
        {
          id: "behavioral_sleep_pattern",
          text: "Is your sleep pattern alright?",
          type: "radio",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ],
          category: "behavioral",
          scoring: {
            category: "behavioral",
            value: { yes: 1, no: -1 }
          }
        },
        {
          id: "behavioral_dragging_feet",
          text: "Do you drag your feet when walking?",
          type: "radio",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ],
          category: "behavioral",
          scoring: {
            category: "behavioral",
            value: { yes: 1, no: -1 }
          }
        },
        {
          id: "behavioral_disturbed_sleep",
          text: "Is your sleep disturbed?",
          type: "radio",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ],
          category: "behavioral",
          scoring: {
            category: "behavioral",
            value: { yes: 1, no: -1 }
          }
        },
        {
          id: "behavioral_depression",
          text: "Are you in depression?",
          type: "radio",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ],
          category: "behavioral",
          scoring: {
            category: "behavioral",
            value: { yes: 1, no: -1 }
          }
        },
        {
          id: "behavioral_anxiety",
          text: "Do you feel anxious always?",
          type: "radio",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ],
          category: "behavioral",
          scoring: {
            category: "behavioral",
            value: { yes: 1, no: -1 }
          }
        },
        {
          id: "behavioral_irritation",
          text: "Do you easily get irritated?",
          type: "radio",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ],
          category: "behavioral",
          scoring: {
            category: "behavioral",
            value: { yes: 1, no: -1 }
          }
        }
      ],
      nextQuestion: {
        nextQuestionId: "cognition"
      }
    },
    {
      id: "cognition",
      title: "Cognitive Assessment",
      type: "form",
      questions: [
        {
          id: "cognitive_memory_problems",
          text: "Do you have any memory problems?",
          type: "radio",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ],
          category: "cognition",
          scoring: {
            category: "cognition",
            value: { yes: 1, no: -1 }
          }
        },
        {
          id: "cognitive_short_term",
          text: "Do you experience short term memory problems?",
          type: "radio",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ],
          category: "cognition",
          scoring: {
            category: "cognition",
            value: { yes: 1, no: -1 }
          }
        },
        {
          id: "cognitive_long_term",
          text: "Have you ever experienced any long term memory problems, such as difficulty to remember past events?",
          type: "radio",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ],
          category: "cognition",
          scoring: {
            category: "cognition",
            value: { yes: 1, no: -1 }
          }
        },
        {
          id: "cognitive_progression",
          text: "Is there a gradual progression in your memory problems?",
          type: "radio",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ],
          category: "cognition",
          scoring: {
            category: "cognition",
            value: { yes: 1, no: -1 }
          }
        },
        {
          id: "cognitive_memory_aids",
          text: "Do you frequently use calendars / diaries as memory aids?",
          type: "radio",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ],
          category: "cognition",
          scoring: {
            category: "cognition",
            value: { yes: 1, no: -1 }
          }
        },
        {
          id: "cognitive_focus",
          text: "Do you find difficulty in focusing on anything?",
          type: "radio",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ],
          category: "cognition",
          scoring: {
            category: "cognition",
            value: { yes: 1, no: -1 }
          }
        },
        {
          id: "cognitive_speech",
          text: "Have you experienced any speech difficulties?",
          type: "radio",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ],
          category: "cognition",
          scoring: {
            category: "cognition",
            value: { yes: 1, no: -1 }
          }
        },
        {
          id: "cognitive_expression",
          text: "Do you find difficulty in expressing yourself?",
          type: "radio",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ],
          category: "cognition",
          scoring: {
            category: "cognition",
            value: { yes: 1, no: -1 }
          }
        },
        {
          id: "cognitive_word_finding",
          text: "Do you experience any word finding problems?",
          type: "radio",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ],
          category: "cognition",
          scoring: {
            category: "cognition",
            value: { yes: 1, no: -1 }
          }
        },
        {
          id: "cognitive_repetition",
          text: "Do you find yourself repeating the same thing in conversations?",
          type: "radio",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ],
          category: "cognition",
          scoring: {
            category: "cognition",
            value: { yes: 1, no: -1 }
          }
        }
      ],
      nextQuestion: {
        nextQuestionId: "end"
      }
    },
    {
      id: "end",
      title: "Assessment Complete",
      type: "form",
      questions: [
        {
          id: "end_feedback",
          text: "Do you have any additional concerns you'd like to share?",
          type: "textarea",
          required: false
        },
        {
          id: "end_followup",
          text: "Would you like to schedule a follow-up appointment?",
          type: "radio",
          required: true,
          options: [
            { value: "yes", label: "Yes, please schedule" },
            { value: "no", label: "No, not at this time" }
          ]
        }
      ],
      nextQuestion: {
        nextQuestionId: "summary"
      }
    }
  ],
  scoring: {
    health: {
      label: "General Health",
      maxScore: 4,
      weight: 1,
    },
    symptoms: {
      label: "Symptom Assessment",
      maxScore: 0,
      weight: 2,
    },
    pain: {
      label: "Pain Level",
      maxScore: 0,
      weight: 2,
    },
    sleep: {
      label: "Sleep Quality",
      maxScore: 2,
      weight: 1,
    },
    lifestyle: {
      label: "Lifestyle Factors",
      maxScore: 3,
      weight: 1,
    },
  },
};
