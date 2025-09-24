import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const categoryOrders = [
    { category: "monochrome", sales: 120 },
    { category: "tees", sales: 90 },
    { category: "sweatshirts", sales: 60 },
    { category: "hoodie", sales: 40 },
    { category: "shirt", sales: 30 }
];
const COLORS = ["rgba(99,102,241, 0.5)", "rgba(34,197,94, 0.5)", "rgba(245,158,11, 0.5)", "rgba(239,68,68, 0.5)", "rgba(59,130,246, 0.5)"];

const MobjePieChart = () => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <PieChart>
                <Pie
                    data={categoryOrders}
                    dataKey="sales"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    // innerRadius={70}
                    label={{ fontSize: 10 }}
                >
                    {
                        categoryOrders.map((_, index) =>
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        )
                    }

                </Pie>

                <Tooltip
                    contentStyle={{ fontSize: 10, textTransform:'capitalize' }}
                    
                />
            </PieChart>

        </ResponsiveContainer>
    )
}

export default MobjePieChart