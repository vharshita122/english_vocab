export interface VocabWord {
  id: string;
  word: string;
  pronunciation: string;
  partOfSpeech: string;
  meaning: string;
  hindiMeaning: string;
  exampleSentence: string;
  synonyms: string[];
  antonyms: string[];
  usageTip: string;
}

export interface VocabNote {
  id: string;
  word: string;
  meaning: string;
  hindiMeaning: string;
  exampleSentence: string;
  personalNote: string;
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SpeakingTopic {
  id: string;
  title: string;
  prompt: string;
  followUps: string[];
  category: string;
  difficulty: "easy" | "medium" | "hard";
}

export const vocabulary: VocabWord[] = [
  {
    id: "1",
    word: "Eloquent",
    pronunciation: "/ˈel.ə.kwənt/",
    partOfSpeech: "adjective",
    meaning: "Fluent and persuasive in speaking or writing.",
    hindiMeaning: "वाक्पटु, सुवाक् — बोलने या लिखने में प्रभावशाली",
    exampleSentence: "She gave an eloquent speech about climate change.",
    synonyms: ["articulate", "expressive", "fluent"],
    antonyms: ["inarticulate", "hesitant"],
    usageTip: "Use 'eloquent' for people who speak beautifully, not just clearly.",
  },
  {
    id: "2",
    word: "Resilience",
    pronunciation: "/rɪˈzɪl.i.əns/",
    partOfSpeech: "noun",
    meaning: "The ability to recover quickly from difficulties.",
    hindiMeaning: "लचीलापन, सहनशक्ति — मुश्किलों से जल्दी उबरने की क्षमता",
    exampleSentence: "His resilience helped him bounce back after the setback.",
    synonyms: ["toughness", "durability", "grit"],
    antonyms: ["fragility", "weakness"],
    usageTip: "Often used with 'show', 'demonstrate', or 'build' resilience.",
  },
  {
    id: "3",
    word: "Ubiquitous",
    pronunciation: "/juːˈbɪk.wɪ.təs/",
    partOfSpeech: "adjective",
    meaning: "Present, appearing, or found everywhere.",
    hindiMeaning: "सर्वत्र उपस्थित, हर जगह मौजूद",
    exampleSentence: "Smartphones have become ubiquitous in modern life.",
    synonyms: ["omnipresent", "pervasive", "everywhere"],
    antonyms: ["rare", "scarce"],
    usageTip: "A formal word — great for essays and presentations.",
  },
  {
    id: "4",
    word: "Serendipity",
    pronunciation: "/ˌser.ənˈdɪp.ə.ti/",
    partOfSpeech: "noun",
    meaning: "Finding something good by happy accident.",
    hindiMeaning: "अनायास अच्छी चीज़ मिलना, सौभाग्यपूर्ण संयोग",
    exampleSentence: "Meeting my mentor was pure serendipity.",
    synonyms: ["chance", "fortune", "luck"],
    antonyms: ["misfortune", "bad luck"],
    usageTip: "Say 'It was serendipity that…' for pleasant surprises.",
  },
  {
    id: "5",
    word: "Gratitude",
    pronunciation: "/ˈɡræt.ɪ.tjuːd/",
    partOfSpeech: "noun",
    meaning: "The quality of being thankful.",
    hindiMeaning: "कृतज्ञता, आभार",
    exampleSentence: "Expressing gratitude can improve your mood.",
    synonyms: ["thankfulness", "appreciation"],
    antonyms: ["ingratitude", "ungratefulness"],
    usageTip: "Common collocations: 'express gratitude', 'feel gratitude', 'with gratitude'.",
  },
  {
    id: "6",
    word: "Ambiguous",
    pronunciation: "/æmˈbɪɡ.ju.əs/",
    partOfSpeech: "adjective",
    meaning: "Open to more than one interpretation; unclear.",
    hindiMeaning: "अस्पष्ट, दोहरे अर्थ वाला",
    exampleSentence: "The instructions were ambiguous and confused everyone.",
    synonyms: ["vague", "unclear", "equivocal"],
    antonyms: ["clear", "explicit", "unambiguous"],
    usageTip: "Don't confuse with 'ambivalent' (having mixed feelings).",
  },
  {
    id: "7",
    word: "Meticulous",
    pronunciation: "/məˈtɪk.jə.ləs/",
    partOfSpeech: "adjective",
    meaning: "Showing great attention to detail.",
    hindiMeaning: "सावधान, बारीकी से काम करने वाला",
    exampleSentence: "She kept meticulous records of every expense.",
    synonyms: ["careful", "precise", "thorough"],
    antonyms: ["careless", "sloppy"],
    usageTip: "Pairs well with 'attention to detail' and 'planning'.",
  },
  {
    id: "8",
    word: "Procrastinate",
    pronunciation: "/prəˈkræs.tɪ.neɪt/",
    partOfSpeech: "verb",
    meaning: "To delay doing something that should be done.",
    hindiMeaning: "टालना, काम को स्थगित करना",
    exampleSentence: "I tend to procrastinate when a task feels overwhelming.",
    synonyms: ["delay", "postpone", "stall"],
    antonyms: ["act promptly", "hurry"],
    usageTip: "Use 'procrastinate on/over' + noun or 'procrastinate + -ing'.",
  },
  {
    id: "9",
    word: "Empathy",
    pronunciation: "/ˈem.pə.θi/",
    partOfSpeech: "noun",
    meaning: "The ability to understand and share others' feelings.",
    hindiMeaning: "सहानुभूति, दूसरों की भावना समझना",
    exampleSentence: "Good leaders show empathy toward their team.",
    synonyms: ["compassion", "understanding", "sympathy"],
    antonyms: ["indifference", "apathy"],
    usageTip: "Empathy = feeling with someone; sympathy = feeling for someone.",
  },
  {
    id: "10",
    word: "Perseverance",
    pronunciation: "/ˌpɜː.sɪˈvɪə.rəns/",
    partOfSpeech: "noun",
    meaning: "Continued effort despite difficulties.",
    hindiMeaning: "दृढ़ता, लगातार प्रयास",
    exampleSentence: "Her perseverance finally led to success.",
    synonyms: ["persistence", "determination", "tenacity"],
    antonyms: ["giving up", "quitting"],
    usageTip: "A powerful word for interviews and motivational contexts.",
  },
  {
    id: "11",
    word: "Concise",
    pronunciation: "/kənˈsaɪs/",
    partOfSpeech: "adjective",
    meaning: "Giving a lot of information in few words.",
    hindiMeaning: "संक्षिप्त, सारगर्भित",
    exampleSentence: "Please keep your answer concise and relevant.",
    synonyms: ["brief", "short", "succinct"],
    antonyms: ["wordy", "lengthy", "verbose"],
    usageTip: "Ideal for emails, summaries, and exam answers.",
  },
  {
    id: "12",
    word: "Diligent",
    pronunciation: "/ˈdɪl.ɪ.dʒənt/",
    partOfSpeech: "adjective",
    meaning: "Showing care and effort in work or duties.",
    hindiMeaning: "मेहनती, परिश्रमी",
    exampleSentence: "He is a diligent student who never misses homework.",
    synonyms: ["hardworking", "industrious", "conscientious"],
    antonyms: ["lazy", "negligent"],
    usageTip: "Often describes students, workers, or researchers.",
  },
  {
    id: "13",
    word: "Innovative",
    pronunciation: "/ˈɪn.ə.veɪ.tɪv/",
    partOfSpeech: "adjective",
    meaning: "Featuring new methods or ideas.",
    hindiMeaning: "नवीन, अभिनव",
    exampleSentence: "The startup proposed an innovative solution to waste management.",
    synonyms: ["creative", "original", "groundbreaking"],
    antonyms: ["conventional", "traditional"],
    usageTip: "Popular in business and technology conversations.",
  },
  {
    id: "14",
    word: "Humble",
    pronunciation: "/ˈhʌm.bəl/",
    partOfSpeech: "adjective",
    meaning: "Not proud; modest about one's abilities.",
    hindiMeaning: "विनम्र, नम्र",
    exampleSentence: "Despite his fame, he remained humble and kind.",
    synonyms: ["modest", "unassuming", "meek"],
    antonyms: ["arrogant", "proud", "boastful"],
    usageTip: "'Humble beginnings' is a common phrase for modest origins.",
  },
  {
    id: "15",
    word: "Versatile",
    pronunciation: "/ˈvɜː.sə.taɪl/",
    partOfSpeech: "adjective",
    meaning: "Able to adapt to many different functions or activities.",
    hindiMeaning: "बहुमुखी, कई कामों में सक्षम",
    exampleSentence: "She is a versatile actor who excels in comedy and drama.",
    synonyms: ["adaptable", "flexible", "all-round"],
    antonyms: ["limited", "inflexible"],
    usageTip: "Great for describing skills, tools, or people with many talents.",
  },
];

export function pickRandomWord(
  words: VocabWord[],
  excludeId?: string
): VocabWord {
  const pool = excludeId ? words.filter((w) => w.id !== excludeId) : words;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function vocabToNote(
  word: VocabWord,
  personalNote = ""
): Omit<VocabNote, "id" | "createdAt" | "updatedAt" | "favorite"> {
  return {
    word: word.word,
    meaning: word.meaning,
    hindiMeaning: word.hindiMeaning,
    exampleSentence: word.exampleSentence,
    personalNote,
  };
}

export const speakingTopics: SpeakingTopic[] = [
  {
    id: "1",
    title: "A Memorable Trip",
    prompt:
      "Describe a trip that left a strong impression on you. Where did you go, what happened, and why was it memorable?",
    followUps: ["Would you go again?", "What did you learn from that experience?"],
    category: "Travel",
    difficulty: "easy",
  },
  {
    id: "2",
    title: "Dream Destination",
    prompt:
      "If you could travel anywhere in the world, where would you go and what would you do there?",
    followUps: ["Who would you take with you?", "How would you prepare for the trip?"],
    category: "Travel",
    difficulty: "easy",
  },
  {
    id: "3",
    title: "Online vs Offline Learning",
    prompt:
      "Compare online learning with traditional classroom education. What are the advantages and disadvantages of each?",
    followUps: ["Which do you prefer and why?", "How will education change in the future?"],
    category: "Education",
    difficulty: "medium",
  },
  {
    id: "4",
    title: "A Teacher Who Inspired You",
    prompt:
      "Talk about a teacher or mentor who had a positive impact on your life or learning.",
    followUps: ["What qualities made them special?", "How did they change your perspective?"],
    category: "Education",
    difficulty: "easy",
  },
  {
    id: "5",
    title: "Technology in Daily Life",
    prompt:
      "How has technology changed the way you communicate, work, or spend your free time?",
    followUps: ["Is this change mostly positive or negative?", "What technology could you not live without?"],
    category: "Technology",
    difficulty: "medium",
  },
  {
    id: "6",
    title: "Social Media Impact",
    prompt:
      "Discuss how social media affects relationships, mental health, or society today.",
    followUps: ["Do you limit your social media use?", "What rules would you suggest for young users?"],
    category: "Technology",
    difficulty: "hard",
  },
  {
    id: "7",
    title: "Your Favorite Hobby",
    prompt:
      "Describe a hobby you enjoy. How did you start, and why do you find it rewarding?",
    followUps: ["How often do you practice it?", "Would you recommend it to others?"],
    category: "Hobbies",
    difficulty: "easy",
  },
  {
    id: "8",
    title: "Learning a New Skill",
    prompt:
      "Talk about a skill you've always wanted to learn. Why does it interest you, and how would you begin?",
    followUps: ["What challenges might you face?", "Who could help you learn it?"],
    category: "Hobbies",
    difficulty: "easy",
  },
  {
    id: "9",
    title: "A Festival You Celebrate",
    prompt:
      "Describe a festival or celebration that is important in your culture or family.",
    followUps: ["What traditions do you follow?", "What is your favorite part of the festival?"],
    category: "Festivals",
    difficulty: "easy",
  },
  {
    id: "10",
    title: "Holiday Traditions",
    prompt:
      "How does your family celebrate holidays? Share customs, food, or rituals that make them special.",
    followUps: ["Have traditions changed over time?", "Which holiday do you look forward to most?"],
    category: "Festivals",
    difficulty: "medium",
  },
  {
    id: "11",
    title: "Healthy Lifestyle",
    prompt:
      "What habits help you stay healthy — physically or mentally? Share your routine or goals.",
    followUps: ["What unhealthy habits are hard to break?", "How can schools promote wellness?"],
    category: "Health",
    difficulty: "medium",
  },
  {
    id: "12",
    title: "Favorite Food & Memory",
    prompt:
      "Describe a dish you love and a memory connected to it.",
    followUps: ["Can you cook it yourself?", "Is it popular in your region?"],
    category: "Food",
    difficulty: "easy",
  },
  {
    id: "13",
    title: "Protecting the Environment",
    prompt:
      "What actions can individuals take to protect the environment in daily life?",
    followUps: ["Should governments do more?", "Are people becoming more eco-conscious?"],
    category: "Environment",
    difficulty: "hard",
  },
  {
    id: "14",
    title: "Dream Job",
    prompt:
      "Describe your ideal job or career path. What would you do, and why does it appeal to you?",
    followUps: ["What skills do you need to develop?", "Would you prefer working alone or in a team?"],
    category: "Career",
    difficulty: "medium",
  },
  {
    id: "15",
    title: "Family Traditions",
    prompt:
      "Share a tradition or value that is important in your family.",
    followUps: ["How has it been passed down?", "Will you continue it in the future?"],
    category: "Family",
    difficulty: "easy",
  },
  {
    id: "16",
    title: "Sports & Teamwork",
    prompt:
      "Talk about a sport you play or enjoy watching. What does it teach about teamwork or discipline?",
    followUps: ["Have you ever competed?", "How does sport bring people together?"],
    category: "Sports",
    difficulty: "easy",
  },
  {
    id: "17",
    title: "A Book or Movie",
    prompt:
      "Describe a book, film, or series that influenced you. What was it about, and why did it matter?",
    followUps: ["Would you recommend it?", "How did it change your thinking?"],
    category: "Entertainment",
    difficulty: "medium",
  },
  {
    id: "18",
    title: "Work-Life Balance",
    prompt:
      "In your opinion, what does a healthy work-life balance look like?",
    followUps: ["How do different cultures approach this?", "What advice would you give someone struggling?"],
    category: "Society",
    difficulty: "hard",
  },
  {
    id: "19",
    title: "Childhood Memory",
    prompt: "Share a vivid childhood memory that still makes you smile.",
    followUps: ["Who was involved?", "How did it shape who you are today?"],
    category: "Personal",
    difficulty: "easy",
  },
  {
    id: "20",
    title: "City vs Countryside",
    prompt:
      "Compare living in a city with living in the countryside. Which do you prefer and why?",
    followUps: ["Where would you raise a family?", "What are the biggest differences in lifestyle?"],
    category: "Travel",
    difficulty: "medium",
  },
];

export function pickRandomTopic(
  topics: SpeakingTopic[],
  excludeId?: string
): SpeakingTopic {
  const pool = excludeId ? topics.filter((t) => t.id !== excludeId) : topics;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(new Date(iso));
}
