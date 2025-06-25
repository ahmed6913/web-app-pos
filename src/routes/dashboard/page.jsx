import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import {
    Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { useTheme } from "@/hooks/use-theme";
import {
    CreditCard, DollarSign, Package, Star, TrendingUp, Users,
} from "lucide-react";
import { Footer } from "@/layouts/footer";

export default function DashboardPage() {
    const { theme } = useTheme();
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [bills, setBills] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const productSnap = await getDocs(collection(db, "products"));
            const customerSnap = await getDocs(collection(db, "customers"));
            const billSnap = await getDocs(collection(db, "bills"));

            setProducts(productSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setCustomers(customerSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setBills(billSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };

        fetchData();
    }, []);

    const totalRevenue = bills.reduce((sum, bill) => sum + (bill.total || 0), 0);
    const overviewData = bills.map(bill => ({
        name: new Date(bill.date).toLocaleDateString(),
        total: bill.total || 0,
    }));

    const recentSales = bills.slice(-5).map(bill => {
        const firstItem = bill.items?.[0];
        const product = products.find(p => p.id === firstItem?.id);
        return {
            id: bill.id,
            name: bill.customer,
            total: bill.total,
            email: bill.phone,
            image: product?.imageUrl || "https://via.placeholder.com/40",
        };
    });

    const topProducts = products
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 5)
        .map((product, index) => ({
            number: index + 1,
            name: product.name,
            description: `In Stock: ${product.quantity}`,
            image: product.imageUrl || "https://via.placeholder.com/80",
            price: product.price,
            rating: product.rating || 0,
            status: product.quantity > 0 ? "Available" : "Out of Stock",
        }));

    return (
        <div className="flex flex-col gap-y-4 text-black dark:text-white">
            <h1 className="title">Dashboard</h1>

            {/* Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <DashboardCard title="Total Products" value={products.length} icon={<Package size={26} />} />
                <DashboardCard title="Total Paid Orders" value={bills.length} icon={<DollarSign size={26} />} />
                <DashboardCard title="Total Customers" value={customers.length} icon={<Users size={26} />} />
                <DashboardCard title="Sales" value={`$${totalRevenue}`} icon={<CreditCard size={26} />} />
            </div>

            {/* Overview + Recent Sales */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Chart */}
                <div className="card col-span-1 md:col-span-2 lg:col-span-4">
                    <div className="card-header"><p className="card-title">Overview</p></div>
                    <div className="card-body p-0">
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={overviewData}>
                                <defs>
                                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Tooltip formatter={val => `$${val}`} />
                                <XAxis dataKey="name" stroke={theme === "light" ? "#475569" : "#94a3b8"} />
                                <YAxis stroke={theme === "light" ? "#475569" : "#94a3b8"} tickFormatter={v => `$${v}`} />
                                <Area type="monotone" dataKey="total" stroke="#2563eb" fill="url(#colorTotal)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Sales */}
                <div className="card col-span-1 md:col-span-2 lg:col-span-3">
                    <div className="card-header"><p className="card-title">Recent Sales</p></div>
                    <div className="card-body h-[300px] overflow-auto p-0">
                        {recentSales.map(sale => (
                            <div key={sale.id} className="flex items-center justify-between gap-x-4 py-2 pr-2">
                                <div className="flex items-center gap-x-4">
                                    <img src={sale.image} alt={sale.name} className="size-10 rounded-full object-cover" />
                                    <div>
                                        <p className="font-medium">{sale.name}</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{sale.email}</p>
                                    </div>
                                </div>
                                <p className="font-medium">${sale.total}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Top Orders */}
            <div className="card">
                <div className="card-header"><p className="card-title">Top Orders</p></div>
                <div className="card-body p-0 overflow-auto">
                    <table className="table">
                        <thead className="table-header">
                            <tr className="table-row">
                                <th className="table-head">#</th>
                                <th className="table-head">Product</th>
                                <th className="table-head">Price</th>
                                <th className="table-head">Status</th>
                                <th className="table-head">Rating</th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            {topProducts.map(product => (
                                <tr key={product.number} className="table-row">
                                    <td className="table-cell">{product.number}</td>
                                    <td className="table-cell">
                                        <div className="flex gap-x-4">
                                            <img src={product.image} alt={product.name} className="size-14 rounded-lg object-cover" />
                                            <div>
                                                <p>{product.name}</p>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">{product.description}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="table-cell">${product.price}</td>
                                    <td className="table-cell">{product.status}</td>
                                    <td className="table-cell">
                                        <div className="flex items-center gap-x-2">
                                            <Star size={18} className="fill-yellow-600 stroke-yellow-600" />
                                            {product.rating}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Footer />
        </div>
    );
}

const DashboardCard = ({ title, value, icon }) => (
    <div className="card">
        <div className="card-header">
            <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 dark:bg-blue-600/20 dark:text-blue-600">
                {icon}
            </div>
            <p className="card-title">{title}</p>
        </div>
        <div className="card-body bg-slate-100 dark:bg-slate-950">
            <p className="text-3xl font-bold">{value}</p>
            <span className="flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 font-medium text-blue-500 dark:border-blue-600 dark:text-blue-600">
                <TrendingUp size={18} />
                10%
            </span>


        </div>
    </div>
);
