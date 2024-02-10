import { useQuery } from "@tanstack/react-query";
import useBioData from "../../Hooks/useBioData";
import useAxiosSecure from './../../Hooks/useAxiosSecure';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import { Helmet } from "react-helmet-async";
import Section_Title from "../../Shared-Compo/Section_Title";

const AdminHome = () => {
    let axiosSecure = useAxiosSecure();
    let [biodataCollection] = useBioData();
    let Male = biodataCollection?.filter((bio) => bio.Gender === "male")
    let Female = biodataCollection?.filter((bio) => bio.Gender === "female")
    let Premium = biodataCollection?.filter((bio) => bio.role === "premium")

    let { data: Revenue = {} } = useQuery({
        queryKey: ['TotalRevenue'],
        queryFn: async () => {
            let res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    })

    const data = [
        { name: 'Total Biodata', value: biodataCollection.length },
        { name: 'Male Biodata', value: Male.length },
        { name: 'Female Biodata', value: Female.length },
        { name: 'Premium Biodata', value: Premium.length },
        { name: 'Total Orders(Revenue)', value: Revenue?.orders },
    ];
    const COLORS = ['#2f1e37', '#7b6645', '#5a2636', '#253951', '#1e3931'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div>
            <Helmet><title>Milon Mela | Admin Home</title></Helmet>
            <Section_Title title={'Admin Status'} subTitle={'all your'}></Section_Title>
            <div className="w-10/12 mx-auto grid grid-cols-2 gap-5 text-2xl mb-5">
                <div className="bg-[#2f1e37] p-5 text-white rounded-xl">Total Biodata: {biodataCollection.length}</div>
                <div className="bg-[#7b6645] p-5 text-white rounded-xl">Male Biodata: {Male.length} </div>
                <div className="bg-[#5a2636] p-5 text-white rounded-xl">Female Biodata: {Female.length} </div>
                <div className="bg-[#253951] p-5 text-white rounded-xl">Premium Biodata: {Premium.length} </div>
            </div>
            <div className="w-6/12 mx-auto text-2xl">
                <div className="bg-[#1e3931] p-5 text-white rounded-xl">Total Revenue: {Revenue.revenue} Tk.</div>
            </div>
            <div className="w-6/12 mx-auto mb-5">
                <PieChart width={500} height={300}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data?.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend></Legend>
                </PieChart>
            </div>
        </div>
    )
}
export default AdminHome;