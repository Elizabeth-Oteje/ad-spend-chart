export interface AdSpendTimePoint {
  date: string;
  "2024": number;
  "2025": number;
}

export interface AdSpendData {
  metric: string;
  currency: string;
  data: AdSpendTimePoint[];
}

const mockData: AdSpendData = {
  "metric": "spend",
  "currency": "USD",
  "data": [
    { "date": "Jan 1", "2024": 420, "2025": 510 },
    { "date": "Jan 2", "2024": 380, "2025": 475 },
    { "date": "Jan 3", "2024": 450, "2025": 520 },
    { "date": "Jan 4", "2024": 410, "2025": 490 },
    { "date": "Jan 5", "2024": 395, "2025": 530 },
    { "date": "Jan 6", "2024": 360, "2025": 480 },
    { "date": "Jan 7", "2024": 425, "2025": 545 },
    { "date": "Jan 8", "2024": 440, "2025": 510 },
    { "date": "Jan 9", "2024": 415, "2025": 525 },
    { "date": "Jan 10", "2024": 390, "2025": 495 },
    { "date": "Jan 11", "2024": 370, "2025": 470 },
    { "date": "Jan 12", "2024": 355, "2025": 455 },
    { "date": "Jan 13", "2024": 410, "2025": 520 },
    { "date": "Jan 14", "2024": 435, "2025": 550 },
    { "date": "Jan 15", "2024": 460, "2025": 575 },
    { "date": "Jan 16", "2024": 445, "2025": 560 },
    { "date": "Jan 17", "2024": 420, "2025": 535 },
    { "date": "Jan 18", "2024": 400, "2025": 505 },
    { "date": "Jan 19", "2024": 385, "2025": 480 },
    { "date": "Jan 20", "2024": 410, "2025": 515 },
    { "date": "Jan 21", "2024": 430, "2025": 540 },
    { "date": "Jan 22", "2024": 455, "2025": 565 },
    { "date": "Jan 23", "2024": 470, "2025": 590 },
    { "date": "Jan 24", "2024": 445, "2025": 555 },
    { "date": "Jan 25", "2024": 425, "2025": 530 },
    { "date": "Jan 26", "2024": 405, "2025": 500 },
    { "date": "Jan 27", "2024": 415, "2025": 520 },
    { "date": "Jan 28", "2024": 440, "2025": 550 },
    { "date": "Jan 29", "2024": 465, "2025": 580 },
    { "date": "Jan 30", "2024": 480, "2025": 600 }
  ]
};

export async function fetchAdSpendData(): Promise<AdSpendData> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return mockData;
}
