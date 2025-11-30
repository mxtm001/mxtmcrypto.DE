"use client"

import { useEffect, useState, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart2, ArrowUpRight, ArrowDownRight, DollarSign, Clock, LogOut, Filter, HelpCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function History() {
  const [user, setUser] = useState<{ email: string; transactions?: any[] } | null>(null)
  const [loading, setLoading] = useState(true)
  const [transactions, setTransactions] = useState<any[]>([])
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser")
    if (!storedUser) {
      router.push("/login")
      return
    }

    try {
      const userData = JSON.parse(storedUser)
      setUser(userData)

      // Generate sample transactions
      const sampleTransactions = [
        {
          id: "txn_001",
          type: "deposit",
          amount: 1000,
          currency: "BRL",
          method: "Credit Card",
          status: "completed",
          date: new Date(Date.now() - 86400000).toLocaleDateString(),
        },
        {
          id: "txn_002",
          type: "investment",
          amount: 500,
          currency: "BRL",
          method: "Premium Plan",
          status: "completed",
          date: new Date(Date.now() - 43200000).toLocaleDateString(),
        },
        {
          id: "txn_003",
          type: "earnings",
          amount: 75,
          currency: "BRL",
          method: "Investment Profit",
          status: "completed",
          date: new Date(Date.now() - 21600000).toLocaleDateString(),
        },
        {
          id: "txn_004",
          type: "withdrawal",
          amount: 200,
          currency: "BRL",
          method: "Bank Transfer",
          status: "pending",
          date: new Date(Date.now() - 10800000).toLocaleDateString(),
        },
        {
          id: "txn_005",
          type: "deposit",
          amount: 750,
          currency: "BRL",
          method: "Bitcoin",
          status: "completed",
          date: new Date().toLocaleDateString(),
        },
        {
          id: "txn_006",
          type: "withdrawal",
          amount: 3500000,
          currency: "EUR",
          method: "ERC20",
          status: "completed",
          date: new Date().toLocaleDateString(),
          address: "0x997bd48085abf2ec7658bc16132b3e21b704be4b",
          tokenType: "ERC20",
          details: "Withdrawal to Ethereum address via ERC20 token transfer",
        },
      ]

      setTransactions(sampleTransactions)
    } catch (error) {
      localStorage.removeItem("currentUser")
      router.push("/login")
    } finally {
      setLoading(false)
    }
  }, [router])

  const depositTransactions = useMemo(() => transactions.filter((tx) => tx.type === "deposit"), [transactions])

  const withdrawalTransactions = useMemo(() => transactions.filter((tx) => tx.type === "withdrawal"), [transactions])

  const investmentTransactions = useMemo(() => transactions.filter((tx) => tx.type === "investment"), [transactions])

  const earningsTransactions = useMemo(() => transactions.filter((tx) => tx.type === "earnings"), [transactions])

  const handleLogout = useCallback(() => {
    localStorage.removeItem("currentUser")
    router.push("/login")
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050e24] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050e24] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a1735] text-white hidden md:block">
        <div className="p-4 border-b border-[#253256]">
          <Link href="/" className="flex items-center">
            <div className="relative w-10 h-10">
              <Image src="/logo.png" alt="MXTM Investment" fill className="object-contain" />
            </div>
            <span className="ml-2 font-medium text-sm">MXTM INVESTMENT</span>
          </Link>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center p-2 rounded-md hover:bg-[#162040] text-gray-300 hover:text-white"
              >
                <BarChart2 className="mr-2 h-5 w-5" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/deposit"
                className="flex items-center p-2 rounded-md hover:bg-[#162040] text-gray-300 hover:text-white"
              >
                <ArrowUpRight className="mr-2 h-5 w-5" />
                Deposit
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/withdraw"
                className="flex items-center p-2 rounded-md hover:bg-[#162040] text-gray-300 hover:text-white"
              >
                <ArrowDownRight className="mr-2 h-5 w-5" />
                Withdraw
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/investments"
                className="flex items-center p-2 rounded-md hover:bg-[#162040] text-gray-300 hover:text-white"
              >
                <DollarSign className="mr-2 h-5 w-5" />
                Investments
              </Link>
            </li>
            <li>
              <Link href="/dashboard/history" className="flex items-center p-2 rounded-md bg-[#162040] text-white">
                <Clock className="mr-2 h-5 w-5" />
                History
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/support"
                className="flex items-center p-2 rounded-md hover:bg-[#162040] text-gray-300 hover:text-white"
              >
                <HelpCircle className="mr-2 h-5 w-5" />
                Support
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center p-2 rounded-md hover:bg-[#162040] text-gray-300 hover:text-white w-full text-left"
              >
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <header className="bg-[#0a1735] p-4 flex justify-between items-center md:hidden">
          <Link href="/" className="flex items-center">
            <div className="relative w-10 h-10">
              <Image src="/logo.png" alt="MXTM Investment" fill className="object-contain" />
            </div>
          </Link>
          <Button variant="outline" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </header>

        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Transaction History</h1>
            <p className="text-gray-400">View all your transaction records</p>
          </div>

          <Card className="bg-[#0a1735] border-[#253256] text-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Transactions</CardTitle>
              <Button variant="outline" size="sm" className="h-8 bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="bg-[#162040] border-[#253256]">
                  <TabsTrigger value="all" className="data-[state=active]:bg-[#0a1735]">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="deposits" className="data-[state=active]:bg-[#0a1735]">
                    Deposits
                  </TabsTrigger>
                  <TabsTrigger value="withdrawals" className="data-[state=active]:bg-[#0a1735]">
                    Withdrawals
                  </TabsTrigger>
                  <TabsTrigger value="investments" className="data-[state=active]:bg-[#0a1735]">
                    Investments
                  </TabsTrigger>
                  <TabsTrigger value="earnings" className="data-[state=active]:bg-[#0a1735]">
                    Earnings
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-4">
                  {transactions && transactions.length > 0 ? (
                    <div className="rounded-md border border-[#253256]">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-[#162040] border-b border-[#253256]">
                              <th className="py-3 px-4 text-left">Type</th>
                              <th className="py-3 px-4 text-left">Amount</th>
                              <th className="py-3 px-4 text-left">Method</th>
                              <th className="py-3 px-4 text-left">Status</th>
                              <th className="py-3 px-4 text-left">Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {transactions.map((tx: any, index: number) => (
                              <tr
                                key={index}
                                className="border-b border-[#253256] hover:bg-[#162040] cursor-pointer transition-colors"
                                onClick={() => setSelectedTransaction(tx)}
                              >
                                <td className="py-3 px-4 capitalize">{tx.type}</td>
                                <td className="py-3 px-4">
                                  R$ {tx.amount.toFixed(2)} {tx.currency}
                                </td>
                                <td className="py-3 px-4">{tx.method}</td>
                                <td className="py-3 px-4">
                                  <span
                                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                                      tx.status === "completed"
                                        ? "bg-green-500/20 text-green-500"
                                        : tx.status === "pending"
                                          ? "bg-yellow-500/20 text-yellow-500"
                                          : "bg-red-500/20 text-red-500"
                                    }`}
                                  >
                                    {tx.status}
                                  </span>
                                </td>
                                <td className="py-3 px-4">{tx.date}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-400">No transactions found</p>
                      <p className="text-sm text-gray-500 mt-2">Make your first deposit to start investing</p>
                      <Button className="mt-4 bg-[#0066ff] hover:bg-[#0066ff]/90">
                        <Link href="/dashboard/deposit">Deposit Now</Link>
                      </Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="deposits" className="mt-4">
                  {depositTransactions && depositTransactions.length > 0 ? (
                    <div className="rounded-md border border-[#253256]">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-[#162040] border-b border-[#253256]">
                              <th className="py-3 px-4 text-left">Amount</th>
                              <th className="py-3 px-4 text-left">Method</th>
                              <th className="py-3 px-4 text-left">Status</th>
                              <th className="py-3 px-4 text-left">Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {depositTransactions.map((tx: any, index: number) => (
                              <tr
                                key={index}
                                className="border-b border-[#253256] hover:bg-[#162040] cursor-pointer transition-colors"
                                onClick={() => setSelectedTransaction(tx)}
                              >
                                <td className="py-3 px-4">
                                  R$ {tx.amount.toFixed(2)} {tx.currency}
                                </td>
                                <td className="py-3 px-4">{tx.method}</td>
                                <td className="py-3 px-4">
                                  <span
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                      tx.status === "completed"
                                        ? "bg-green-500/20 text-green-500"
                                        : tx.status === "pending"
                                          ? "bg-yellow-500/20 text-yellow-500"
                                          : "bg-red-500/20 text-red-500"
                                    }`}
                                  >
                                    {tx.status}
                                  </span>
                                </td>
                                <td className="py-3 px-4">{tx.date}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-400">No deposits found</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="withdrawals" className="mt-4">
                  {withdrawalTransactions && withdrawalTransactions.length > 0 ? (
                    <div className="rounded-md border border-[#253256]">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-[#162040] border-b border-[#253256]">
                              <th className="py-3 px-4 text-left">Amount</th>
                              <th className="py-3 px-4 text-left">Method</th>
                              <th className="py-3 px-4 text-left">Status</th>
                              <th className="py-3 px-4 text-left">Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {withdrawalTransactions.map((tx: any, index: number) => (
                              <tr
                                key={index}
                                className="border-b border-[#253256] hover:bg-[#162040] cursor-pointer transition-colors"
                                onClick={() => setSelectedTransaction(tx)}
                              >
                                <td className="py-3 px-4">
                                  R$ {tx.amount.toFixed(2)} {tx.currency}
                                </td>
                                <td className="py-3 px-4">{tx.method}</td>
                                <td className="py-3 px-4">
                                  <span
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                      tx.status === "completed"
                                        ? "bg-green-500/20 text-green-500"
                                        : tx.status === "pending"
                                          ? "bg-yellow-500/20 text-yellow-500"
                                          : "bg-red-500/20 text-red-500"
                                    }`}
                                  >
                                    {tx.status}
                                  </span>
                                </td>
                                <td className="py-3 px-4">{tx.date}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-400">No withdrawals found</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="investments" className="mt-4">
                  {investmentTransactions && investmentTransactions.length > 0 ? (
                    <div className="rounded-md border border-[#253256]">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-[#162040] border-b border-[#253256]">
                              <th className="py-3 px-4 text-left">Amount</th>
                              <th className="py-3 px-4 text-left">Plan</th>
                              <th className="py-3 px-4 text-left">Status</th>
                              <th className="py-3 px-4 text-left">Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {investmentTransactions.map((tx: any, index: number) => (
                              <tr
                                key={index}
                                className="border-b border-[#253256] hover:bg-[#162040] cursor-pointer transition-colors"
                                onClick={() => setSelectedTransaction(tx)}
                              >
                                <td className="py-3 px-4">
                                  R$ {tx.amount.toFixed(2)} {tx.currency}
                                </td>
                                <td className="py-3 px-4">{tx.method}</td>
                                <td className="py-3 px-4">
                                  <span
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                      tx.status === "completed"
                                        ? "bg-green-500/20 text-green-500"
                                        : tx.status === "pending"
                                          ? "bg-yellow-500/20 text-yellow-500"
                                          : "bg-red-500/20 text-red-500"
                                    }`}
                                  >
                                    {tx.status}
                                  </span>
                                </td>
                                <td className="py-3 px-4">{tx.date}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-400">No investments found</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="earnings" className="mt-4">
                  {earningsTransactions && earningsTransactions.length > 0 ? (
                    <div className="rounded-md border border-[#253256]">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-[#162040] border-b border-[#253256]">
                              <th className="py-3 px-4 text-left">Amount</th>
                              <th className="py-3 px-4 text-left">Source</th>
                              <th className="py-3 px-4 text-left">Status</th>
                              <th className="py-3 px-4 text-left">Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {earningsTransactions.map((tx: any, index: number) => (
                              <tr
                                key={index}
                                className="border-b border-[#253256] hover:bg-[#162040] cursor-pointer transition-colors"
                                onClick={() => setSelectedTransaction(tx)}
                              >
                                <td className="py-3 px-4">
                                  R$ {tx.amount.toFixed(2)} {tx.currency}
                                </td>
                                <td className="py-3 px-4">{tx.method}</td>
                                <td className="py-3 px-4">
                                  <span
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                      tx.status === "completed"
                                        ? "bg-green-500/20 text-green-500"
                                        : tx.status === "pending"
                                          ? "bg-yellow-500/20 text-yellow-500"
                                          : "bg-red-500/20 text-red-500"
                                    }`}
                                  >
                                    {tx.status}
                                  </span>
                                </td>
                                <td className="py-3 px-4">{tx.date}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-400">No earnings found</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Transaction Details Modal */}
        {selectedTransaction && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#162040] rounded-lg shadow-2xl max-w-lg w-full border border-[#253256]">
              <div className="bg-gradient-to-r from-[#1a2750] to-[#253256] px-6 py-4 rounded-t-lg flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Transaction Details</h2>
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="text-gray-400 hover:text-white text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <p className="text-gray-400 text-sm">Type</p>
                  <p className="text-white font-semibold capitalize">{selectedTransaction.type}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-gray-400 text-sm">Amount</p>
                  <p className="text-white font-semibold text-lg">
                    €
                    {selectedTransaction.amount.toLocaleString("de-DE", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-gray-400 text-sm">Method</p>
                  <p className="text-white font-semibold">{selectedTransaction.method}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-gray-400 text-sm">Status</p>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      selectedTransaction.status === "completed"
                        ? "bg-green-500/20 text-green-500"
                        : selectedTransaction.status === "pending"
                          ? "bg-yellow-500/20 text-yellow-500"
                          : "bg-red-500/20 text-red-500"
                    }`}
                  >
                    {selectedTransaction.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-gray-400 text-sm">Date</p>
                  <p className="text-white font-semibold">{selectedTransaction.date}</p>
                </div>

                {selectedTransaction.type === "withdrawal" && selectedTransaction.address && (
                  <div className="space-y-2 bg-[#0a0e27] p-3 rounded-lg border border-[#253256]">
                    <p className="text-gray-400 text-sm">Blockchain Address (ERC20)</p>
                    <div className="flex items-center gap-2">
                      <p className="text-white font-mono text-sm break-all">{selectedTransaction.address}</p>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(selectedTransaction.address)
                        }}
                        className="text-blue-400 hover:text-blue-300 text-sm whitespace-nowrap ml-auto"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                )}

                {selectedTransaction.tokenType && (
                  <div className="space-y-2">
                    <p className="text-gray-400 text-sm">Token Type</p>
                    <p className="text-white font-semibold">{selectedTransaction.tokenType}</p>
                  </div>
                )}
              </div>

              <div className="bg-[#0a0e27] px-6 py-4 rounded-b-lg border-t border-[#253256]">
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
