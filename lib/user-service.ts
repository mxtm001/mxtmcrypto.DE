export interface UserProfile {
  id: string
  email: string
  name: string
  firstName?: string
  lastName?: string
  balance: number
  totalInvested: number
  totalEarnings: number
  verificationStatus: "pending" | "approved" | "rejected"
  isVerified: boolean
  joined: string
  phone?: string
  country?: string
}

export interface Investment {
  id: string
  name: string
  amount: number
  currentValue: number
  returnRate: number
  duration: string
  startDate: string
  endDate: string
  status: "active" | "completed" | "cancelled"
}

export interface Transaction {
  id: string
  type: "deposit" | "withdrawal" | "earnings" | "investment"
  amount: number
  description: string
  date: string
  status: "completed" | "pending" | "failed"
}

class UserService {
  private currentUser: UserProfile | null = null

  async login(email: string, password: string): Promise<UserProfile> {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user: UserProfile = {
      id: "1",
      email: email,
      name: email.split("@")[0],
      firstName: email.split("@")[0],
      balance: 26500000, // deducted 3.5M from 30M EUR
      totalInvested: 26500000,
      totalEarnings: 26500000,
      verificationStatus: "approved",
      isVerified: true,
      joined: new Date().toLocaleDateString("de-DE"),
    }

    this.currentUser = user
    if (typeof window !== "undefined") {
      localStorage.setItem("currentUser", JSON.stringify(user))
    }

    return user
  }

  async register(userData: any): Promise<UserProfile> {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user: UserProfile = {
      id: Date.now().toString(),
      email: userData.email,
      name: `${userData.firstName} ${userData.lastName}`,
      firstName: userData.firstName,
      lastName: userData.lastName,
      balance: 26500000, // deducted 3.5M from 30M EUR
      totalInvested: 26500000,
      totalEarnings: 26500000,
      verificationStatus: "approved",
      isVerified: true,
      joined: new Date().toLocaleDateString("de-DE"),
      phone: userData.phone,
      country: userData.country,
    }

    if (typeof window !== "undefined") {
      const registrations = JSON.parse(localStorage.getItem("user_registrations") || "[]")
      registrations.unshift({
        id: user.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        country: userData.country,
        createdAt: new Date().toISOString(),
      })
      localStorage.setItem("user_registrations", JSON.stringify(registrations))
    }

    this.currentUser = user
    if (typeof window !== "undefined") {
      localStorage.setItem("currentUser", JSON.stringify(user))
    }

    return user
  }

  async getCurrentUser(): Promise<UserProfile | null> {
    if (this.currentUser) {
      return this.currentUser
    }

    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("currentUser")
      if (stored) {
        this.currentUser = JSON.parse(stored)
        return this.currentUser
      }
    }

    return null
  }

  async logout(): Promise<void> {
    this.currentUser = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("currentUser")
    }
  }

  async getUserInvestments(): Promise<Investment[]> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    return [
      {
        id: "1",
        name: "Bitcoin Premium Plan",
        amount: 1000000,
        currentValue: 1150000,
        returnRate: 15,
        duration: "45 Tage",
        startDate: "2024-01-15",
        endDate: "2024-03-01",
        status: "active",
      },
      {
        id: "2",
        name: "Ethereum Elite Package",
        amount: 750000,
        currentValue: 862500,
        returnRate: 15,
        duration: "60 Tage",
        startDate: "2024-01-10",
        endDate: "2024-03-10",
        status: "active",
      },
      {
        id: "3",
        name: "Forex Trading Portfolio",
        amount: 500000,
        currentValue: 575000,
        returnRate: 15,
        duration: "30 Tage",
        startDate: "2024-01-20",
        endDate: "2024-02-19",
        status: "active",
      },
      {
        id: "4",
        name: "DeFi Yield Farming",
        amount: 850000,
        currentValue: 977500,
        returnRate: 15,
        duration: "45 Tage",
        startDate: "2024-01-12",
        endDate: "2024-02-26",
        status: "active",
      },
      {
        id: "5",
        name: "Crypto Index Fund",
        amount: 650000,
        currentValue: 747500,
        returnRate: 15,
        duration: "60 Tage",
        startDate: "2024-01-08",
        endDate: "2024-03-08",
        status: "active",
      },
    ]
  }

  async getUserTransactions(): Promise<Transaction[]> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    return [
      {
        id: "txn_withdrawal_3.5m",
        type: "withdrawal",
        amount: 3500000,
        description: "ERC20 Blockchain Withdrawal - Address: 0x997bd48085abf2ec7658bc16132b3e21b704be4b",
        date: new Date().toISOString(),
        status: "completed",
      },
      {
        id: "1",
        type: "deposit",
        amount: 250000,
        description: "Einzahlung via Banküberweisung",
        date: new Date().toISOString(),
        status: "completed",
      },
      {
        id: "2",
        type: "earnings",
        amount: 87500,
        description: "Investitionsrendite - Bitcoin Premium",
        date: new Date(Date.now() - 86400000).toISOString(),
        status: "completed",
      },
      {
        id: "3",
        type: "investment",
        amount: 500000,
        description: "Neue Investition - Forex Trading",
        date: new Date(Date.now() - 172800000).toISOString(),
        status: "completed",
      },
      {
        id: "4",
        type: "earnings",
        amount: 62500,
        description: "Tägliche Rendite - Ethereum Elite",
        date: new Date(Date.now() - 259200000).toISOString(),
        status: "completed",
      },
      {
        id: "5",
        type: "deposit",
        amount: 1000000,
        description: "Einzahlung via Kryptowährung",
        date: new Date(Date.now() - 345600000).toISOString(),
        status: "completed",
      },
    ]
  }

  async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (this.currentUser) {
      this.currentUser = { ...this.currentUser, ...updates }
      if (typeof window !== "undefined") {
        localStorage.setItem("currentUser", JSON.stringify(this.currentUser))
      }
    }

    return this.currentUser!
  }

  async withdraw(amount: number, method: string, address?: string): Promise<{ success: boolean; message: string }> {
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return {
      success: false,
      message: "Fehlgeschlagene Auszahlung. Bitte zahlen Sie 550 EUR ein, um den Betrag abheben zu können.",
    }
  }

  async deposit(amount: number, method: string): Promise<{ success: boolean; message: string }> {
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (this.currentUser) {
      this.currentUser.balance += amount
      if (typeof window !== "undefined") {
        localStorage.setItem("currentUser", JSON.stringify(this.currentUser))
      }
    }

    return {
      success: true,
      message: "Einzahlung erfolgreich! Ihr Guthaben wurde aktualisiert.",
    }
  }
}

export const userService = new UserService()
