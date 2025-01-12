enum AccountStatus {
  ACTIVE = "active",
  CLOSED = "closed",
}

enum CurrencyCode {
  USD = "USD", // United States Dollar
  EUR = "EUR", // Euro
  GBP = "GBP", // British Pound Sterling
  JPY = "JPY", // Japanese Yen
  AUD = "AUD", // Australian Dollar
  CAD = "CAD", // Canadian Dollar
  CHF = "CHF", // Swiss Franc
  CNY = "CNY", // Chinese Yuan
  SEK = "SEK", // Swedish Krona
  NZD = "NZD", // New Zealand Dollar
  // Add more currencies as needed
  // Including Germany
  DEM = "DEM", // Deutsche Mark (Germany)
}

// the use of this is so as the currency formarter can be used in the app properly

enum Role {
  User = "user",
  Admin = "admin",
}

enum AccountType {
  SAVINGS = "savings",
  CHECKING = "checking",
  BUSINESS = "business",
}

enum TransactionType {
  DEPOSIT = "deposit",
  WITHDRAWAL = "withdrawal",
}

enum TransactionStatus {
  PENDING = "pending",
  APPROVED = "approved",
  DECLINED = "declined",
  FAILED = "failed",
}

export {
  AccountStatus,
  CurrencyCode,
  Role,
  AccountType,
  TransactionStatus,
  TransactionType,
};
