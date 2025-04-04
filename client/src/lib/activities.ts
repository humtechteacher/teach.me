import { Activity } from "./types";
import { AlertTriangle, FileSearch, Clock } from "lucide-react";
import React from 'react';

// Array of all activities in the application
// This file makes it easy to add new activities in the future
export const activities: Activity[] = [
  {
    title: "Misinformation Game",
    description: "Test your ability to identify misinformation and find reliable sources.",
    path: "/activities/misinformation-game",
    icon: React.createElement(AlertTriangle, { size: 96 }),
    category: "Digital Literacy",
    available: true
  },
  {
    title: "Source Evaluation",
    description: "Learn to evaluate the credibility of different information sources.",
    path: "/activities/source-evaluation",
    icon: React.createElement(FileSearch, { size: 96 }),
    category: "Research Skills",
    available: false
  },
  {
    title: "Fact Checking Challenge",
    description: "Race against time to fact-check claims using reliable sources.",
    path: "/activities/fact-checking",
    icon: React.createElement(Clock, { size: 96 }),
    category: "Media Literacy",
    available: false
  }
];

// Featured activity that will be highlighted on the home page
export const featuredActivity = activities[0];
