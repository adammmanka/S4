import { Company } from "../types/Company";

// Mock company data for our Silicon Valley-inspired town
const mockCompanies: Company[] = [
  {
    id: "pied-piper",
    name: "Pied Piper",
    description:
      "A revolutionary compression algorithm company focused on the new internet.",
    industry: "Data Compression",
    foundedYear: 2014,
    employees: 12,
    address: {
      street: "5230 Newell Road",
      city: "Palo Alto",
      state: "CA",
      zip: "94303",
      coordinates: { x: 0, z: 0 },
    },
    logoColor: "#00FF00", // Green
    buildingHeight: 4,
    buildingWidth: 6,
    buildingDepth: 6,
  },
  {
    id: "hooli",
    name: "Hooli",
    description:
      "A massive tech conglomerate with questionable ethics but unlimited resources.",
    industry: "Technology",
    foundedYear: 2009,
    employees: 25000,
    address: {
      street: "1401 N Shoreline Blvd",
      city: "Mountain View",
      state: "CA",
      zip: "94043",
      coordinates: { x: -20, z: 10 },
    },
    logoColor: "#4285F4", // Blue
    buildingHeight: 15,
    buildingWidth: 20,
    buildingDepth: 20,
  },
  {
    id: "raviga",
    name: "Raviga Capital",
    description:
      "A venture capital firm funding the next generation of tech startups.",
    industry: "Venture Capital",
    foundedYear: 2010,
    employees: 45,
    address: {
      street: "3000 Sand Hill Road",
      city: "Menlo Park",
      state: "CA",
      zip: "94025",
      coordinates: { x: 15, z: -15 },
    },
    logoColor: "#800080", // Purple
    buildingHeight: 6,
    buildingWidth: 10,
    buildingDepth: 8,
  },
  {
    id: "endframe",
    name: "Endframe",
    description:
      "A competitor to Pied Piper with inferior technology but better business acumen.",
    industry: "Data Compression",
    foundedYear: 2015,
    employees: 35,
    address: {
      street: "100 University Ave",
      city: "Palo Alto",
      state: "CA",
      zip: "94301",
      coordinates: { x: -15, z: -20 },
    },
    logoColor: "#FFA500", // Orange
    buildingHeight: 5,
    buildingWidth: 8,
    buildingDepth: 8,
  },
  {
    id: "sliceline",
    name: "Sliceline",
    description:
      "A pizza delivery optimization platform using advanced algorithms.",
    industry: "Food Tech",
    foundedYear: 2017,
    employees: 22,
    address: {
      street: "789 Middlefield Road",
      city: "Redwood City",
      state: "CA",
      zip: "94063",
      coordinates: { x: 25, z: 5 },
    },
    logoColor: "#FF0000", // Red
    buildingHeight: 3,
    buildingWidth: 7,
    buildingDepth: 7,
  },
  {
    id: "bachmanity",
    name: "Bachmanity",
    description:
      "A hybrid incubator and entertainment company with eccentric leadership.",
    industry: "Incubator",
    foundedYear: 2016,
    employees: 8,
    address: {
      street: "456 Castro Street",
      city: "Mountain View",
      state: "CA",
      zip: "94041",
      coordinates: { x: 10, z: 25 },
    },
    logoColor: "#FFFF00", // Yellow
    buildingHeight: 4,
    buildingWidth: 9,
    buildingDepth: 9,
  },
];

// Function to load company data (simulates an API call)
export const loadCompanyRegistry = async (): Promise<Company[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return mock data
  return mockCompanies;
};
