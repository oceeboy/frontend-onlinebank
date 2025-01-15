type AccountType = "savings" | "checking" | "business";
type Role = "user" | "admin";
type AccountStatus = "active" | "closed";
export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
  };
  accountNumber: string;
  balance: number;
  currency: string;
  role: Role;
  isFrozen: boolean;
  accountStatus: AccountStatus;
  kycVerified: boolean;
  accountType: AccountType;
  code: string;
};

declare interface ChildrenProps {
  children: React.ReactNode;
}

interface Headers {
  [key: string]: string;
}

interface Response {
  status: number;
  statusText: string;
  headers: Headers;
  body: [];
  bodyUsed: boolean;
  ok: boolean;
  redirected: boolean;
  type: string;
  url: string;
}

interface Request {
  method: string;
  url: string;
  headers: Headers;
  destination: string;
  referrer: string;
  referrerPolicy: string;
  mode: string;
  credentials: string;
  cache: string;
  redirect: string;
  integrity: string;
  keepalive: boolean;
  isReloadNavigation: boolean;
  isHistoryNavigation: boolean;
  signal: AbortSignal;
}

declare interface APIRequestResponse {
  response: Response;
  request: Request;
  options: object;
}

interface APIRequest {
  request: Request;
  options: object;
  signal: AbortSignal;
}

declare interface QueuePromise {
  resolve: (value: string | null) => void;
  reject: (reason?: unknown) => void;
}

declare interface SiderbarProps {
  user: User;
}

declare interface FooterProps {
  user: User;
  type?: "mobile" | "desktop";
}

declare interface HeaderBoxProps {
  type?: "title" | "greeting";
  title: string;
  subtext: string;
  user?: string;
}

declare interface DoughnutChartProps {
  account: User;
}

declare interface TotalBalanceBoxProps {
  accounts: User;
}

declare type CategoryCount = {
  name: TransactionType;
  count: number;
  totalCount: number;
};

type TransactionType = "deposit" | "withdrawal";

type TransactionStatus = "pending" | "approved" | "declined" | "failed";

declare interface Transaction {
  _id: string;
  userId: User["_id"];
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  code?: string;
  narration: string;
  createdAt: Date;
  updatedAt: Date;
  iban?: string;
  bic?: string;
  reference?: string;
  recipientName?: string;
  bankAddress?: string;
  recipientBankName?: string;
  [key: string]: string | number | boolean | Date | undefined;
}

declare interface RightSidebarProps {
  user: User;
  transactions: Transaction[];
}

declare interface BankCardProps {
  account: User;
  userName: string;
  showBalance?: boolean;
}

declare interface CategoryProps {
  category: CategoryCount;
}

declare interface BankTabItemProps {
  account: User;
}

declare interface TransactionTableProps {
  transactions: Transaction[];
}

declare interface CategoryBadgeProps {
  status: TransactionStatus;
}

declare interface BankInfoProps {
  account: User;
  appwriteItemId?: string;
  type: "full" | "card";
}

declare interface RecentTransactionsProps {
  accounts: User;
  transactions: Transaction[];
  page: number;
}

declare interface PaginationProps {
  page: number;
  totalPages: number;
}

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
