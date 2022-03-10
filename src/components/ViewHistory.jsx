import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const ViewHistory = ({ movie }) => {
  const { userInfo } = useSelector((state) => state.userLogin)
  const [dataLoaded, setDataLoaded] = useState(false)
  const [chartData, setChartData] = useState({})

  useEffect(() => {
    function loadVHistory() {
      // Load data from storage
      const historyFromStorage = localStorage.getItem('viewHistory2')
        ? JSON.parse(localStorage.getItem('viewHistory2'))
        : { movies: [] }
      // Check if movie is already in data
      let mFound = historyFromStorage.movies.findIndex(
        (m) => m.title === movie.title
      )
      if (mFound < 0) {
        // If the movie was not found add movie object to array
        mFound = historyFromStorage.movies.push({
          title: `${movie.title}`,
          users: [],
        })
        // Index of movie will be length -1
        mFound -= 1
      }
      // Check if user is already in data
      let uFound = historyFromStorage.movies[mFound].users.findIndex(
        (u) => u.name === userInfo.name
      )
      if (uFound < 0) {
        // User not found, add to user array
        uFound = historyFromStorage.movies[mFound].users.push({
          name: `${userInfo.name}`,
          views: [],
        })
        // Index of user will be length -1
        uFound -= 1
      }
      // Parse string dates and remove older than 7 day entries
      const updViews = removeOldDates(
        historyFromStorage.movies[mFound].users[uFound].views
      )
      // Add this visit to array
      updViews.push(new Date())
      // Save new data to storage
      historyFromStorage.movies[mFound].users[uFound].views = updViews
      localStorage.setItem('viewHistory2', JSON.stringify(historyFromStorage))
      // Turn views into buckets by day so we can display them in the chart
      const viewsInBuckets = buildChartData(updViews)
      const newData = {
        data: {
          labels: Object.keys(viewsInBuckets),
          datasets: [
            {
              label: `Visits`,
              backgroundColor: 'rgb(57, 193, 227)',
              data: Object.values(viewsInBuckets),
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: `${userInfo.name}'s past week views for ${movie.title}`,
            },
          },
        },
      }
      setChartData(newData)
    }

    if (Object.keys(movie).length > 0) {
      setDataLoaded(false)
      loadVHistory()
      setDataLoaded(true)
    }
  }, [movie, userInfo])

  const buildChartData = (updViews) => {
    // Group them by locale date and count before displaying
    let dtBucket = {}
    updViews.forEach((dt) => {
      const offset = dt.getTimezoneOffset()
      const newDt = new Date(dt.getTime() - offset * 60 * 1000)
      const dtString = newDt.toISOString().substring(0, 10)
      if (typeof dtBucket[dtString] == 'undefined') {
        dtBucket[dtString] = 0
      }
      dtBucket[dtString] += 1
    })
    return dtBucket
  }

  const removeOldDates = (datesList) => {
    // Get list of 'string' dates and turn them into date class
    // also remove older than 7 days
    const weekAgo = new Date(new Date().setDate(new Date().getDate() - 7))
    const fmtDates = datesList.map((d) => new Date(d))
    return fmtDates.filter((d) => d > weekAgo).sort((dt1, dt2) => dt1 - dt2)
  }

  return (
    <>
      <h4 className="mt-4">Historial de visitas</h4>
      {dataLoaded && <Bar data={chartData.data} options={chartData.options} />}
    </>
  )
}

export default ViewHistory
