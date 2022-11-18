import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import styles from './Chart.module.scss'
import Card from '../card/Card';
import { selectOrderHistory } from '../../redux/slice/orderSlice';
import { useSelector } from 'react-redux';



ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart',
    },
  },
};

const Vchart = () => {
  const orders = useSelector(selectOrderHistory)
  //Create a new array of order status
  const array = []
  
  orders.map((item) => {
    const {orderStatus} = item
   return array.push(orderStatus)
  })
  
  const getOrderCounts = (array , value) => {
   //const count=  array.filter((item , index) => array.indexOf(item) !== index)
    return array.filter((n) => n === value).length
  }

  const [q1 , q2 , q3 , q4] = ["Order Placed..." , "Processing..."  , "Shipped..." , "Delivered"]

  const placed = getOrderCounts(array , q1)
  const processing = getOrderCounts(array , q2)
  const Shipping = getOrderCounts(array , q3)
  const delivered = getOrderCounts(array , q4)

  
   const data = {
    labels : ["Placed Orders" , "Processing" , "Shipping" , "Delivered"],
    datasets: [
      {
        label: 'Order count',
        data: [placed , processing , Shipping , delivered],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  return (
    <div className={styles.charts}>
      <Card cardClass={styles.card}>
      <Bar options={options} data={data} />
      </Card>
    </div>
  )
}

export default Vchart