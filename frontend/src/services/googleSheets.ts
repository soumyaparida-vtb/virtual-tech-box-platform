// services/googleSheets.ts
// This file is just for type definitions - actual Google Sheets integration happens on backend
export interface GoogleSheetsConfig {
  spreadsheetId: string;
  credentialsPath: string;
}

export interface SheetData {
  name: string;
  email: string;
  phoneNumber: string;
  learningArea: string;
  registeredAt: string;
}