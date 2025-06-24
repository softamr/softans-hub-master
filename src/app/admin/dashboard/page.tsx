import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MessageSquare, Users, Newspaper, Briefcase, TrendingUp, Activity, Clock, Star } from "lucide-react"

export default function AdminDashboardPage() {
    const stats = [
        {
            title: "New Messages",
            value: "12",
            icon: MessageSquare,
            change: "+2.5%",
            trend: "up",
            color: "from-blue-500 to-blue-600"
        },
        {
            title: "Total Clients",
            value: "45",
            icon: Users,
            change: "+12.3%",
            trend: "up",
            color: "from-green-500 to-green-600"
        },
        {
            title: "Blog Posts",
            value: "23",
            icon: Newspaper,
            change: "+5.1%",
            trend: "up",
            color: "from-purple-500 to-purple-600"
        },
        {
            title: "Services Offered",
            value: "8",
            icon: Briefcase,
            change: "+1",
            trend: "up",
            color: "from-orange-500 to-orange-600"
        },
    ]

    const recentActivities = [
        { action: "New client inquiry received", time: "2 minutes ago", icon: MessageSquare },
        { action: "Blog post published", time: "1 hour ago", icon: Newspaper },
        { action: "Service updated", time: "3 hours ago", icon: Briefcase },
        { action: "New user registered", time: "5 hours ago", icon: Users },
    ]

  return (
    <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-2xl"></div>
            <div className="relative p-8 rounded-2xl border border-border/20 bg-white/50 backdrop-blur-sm">
                <h1 className="text-4xl font-bold font-headline bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Admin Dashboard
                </h1>
                <p className="text-muted-foreground mt-2 text-lg">Welcome back, Admin. Here's an overview of your site performance.</p>
                <div className="flex items-center gap-2 mt-4 text-sm text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>All metrics are trending upward</span>
                </div>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
                <Card
                    key={stat.title}
                    className="relative overflow-hidden border-0 shadow-modern hover-lift bg-white/80 backdrop-blur-sm"
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`}></div>

                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            {stat.title}
                        </CardTitle>
                        <div className={`p-2 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                            <stat.icon className="h-4 w-4 text-white" />
                        </div>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <div className="text-3xl font-bold font-headline">{stat.value}</div>
                        <div className="flex items-center gap-1 mt-2">
                            <TrendingUp className="w-3 h-3 text-green-500" />
                            <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                            <span className="text-xs text-muted-foreground">from last month</span>
                        </div>
                    </CardContent>

                    {/* Bottom accent line */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`}></div>
                </Card>
            ))}
        </div>

        {/* Recent Activity */}
        <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-0 shadow-modern bg-white/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline">
                        <Activity className="w-5 h-5 text-blue-600" />
                        Recent Activity
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {recentActivities.map((activity, index) => (
                            <div key={index} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                <div className="p-2 rounded-lg bg-blue-50">
                                    <activity.icon className="w-4 h-4 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">{activity.action}</p>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Clock className="w-3 h-3" />
                                        {activity.time}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-modern bg-white/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline">
                        <Star className="w-5 h-5 text-purple-600" />
                        Quick Actions
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-3">
                        <button className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 text-left group">
                            <div className="flex items-center gap-3">
                                <MessageSquare className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                                <div>
                                    <p className="font-medium text-blue-900">View Messages</p>
                                    <p className="text-sm text-blue-600">Check new inquiries</p>
                                </div>
                            </div>
                        </button>

                        <button className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-300 text-left group">
                            <div className="flex items-center gap-3">
                                <Newspaper className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
                                <div>
                                    <p className="font-medium text-green-900">Create Post</p>
                                    <p className="text-sm text-green-600">Write new blog post</p>
                                </div>
                            </div>
                        </button>

                        <button className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition-all duration-300 text-left group">
                            <div className="flex items-center gap-3">
                                <Briefcase className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
                                <div>
                                    <p className="font-medium text-purple-900">Manage Services</p>
                                    <p className="text-sm text-purple-600">Update service offerings</p>
                                </div>
                            </div>
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}
