import React, {forwardRef} from 'react'
import Table from 'material-table'
import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import {Pie} from 'react-chartjs-2'

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
}

const convertBinsToLookup = bins => {
  const lookup = {}
  bins.forEach(bin => {
    lookup[bin.id] = bin.type
  })
  //object {0: 'Wood'}
  return lookup
}

const pieLabels = [
  'Wood',
  'Glass Bottles/Containers',
  'Aluminum Cans/Containers',
  'Landfill',
  'Plastic Bottles/Containers',
  'Compost',
  'Plastic Wrap',
  'E-Waste',
  'Metal',
  'Paper Cardboard'
]

const legendOps = {
  display: true,
  position: 'bottom',
  fullWidth: false,
  reverse: false
}
const getPickupBinsPieData = (pickups, bins) => {
  const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  //preserves and matches the order from label to color
  console.log('getting data...')
  const lookup = convertBinsToLookup(bins)
  pickups.forEach(pickup => {
    const type = lookup[pickup.binId]
    data[pieLabels.indexOf(type)] += pickup.lbs
  })
  return data
}
const getPickupBinsPieData2 = (pickups, bins) => {
  const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  //preserves and matches the order from label to color
  console.log('getting data...')
  const lookup = convertBinsToLookup(bins)
  pickups.forEach(pickup => {
    const type = lookup[pickup.binId]
    data[pieLabels.indexOf(type)] += 1
  })
  return data
}

const PickupView = ({pickups, bins}) => {
  const columns = [
    {title: 'ID', field: 'id'},
    {title: 'Date', field: 'date'},
    {title: 'lbs', field: 'lbs'},
    {title: 'category', field: 'binId', lookup: convertBinsToLookup(bins)}
  ]
  const pieData1 = {
    labels: pieLabels,
    datasets: [
      {
        data: getPickupBinsPieData(pickups, bins),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#0FA3B1',
          '#B5E2FA',
          '#F9F7F3',
          '#EDDEA4',
          '#F7A072',
          '#A9B2AC',
          '#F7E8A4'
        ],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  }
  const pieData2 = {
    labels: pieLabels,
    datasets: [
      {
        data: getPickupBinsPieData2(pickups, bins),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#0FA3B1',
          '#B5E2FA',
          '#F9F7F3',
          '#EDDEA4',
          '#F7A072',
          '#A9B2AC',
          '#F7E8A4'
        ],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  }

  return (
    <div>
      <Table
        data={pickups}
        title="Pickups"
        icons={tableIcons}
        columns={columns}
      />
      <div className="chart-container">
        <div className="chart">
          <h1>Lbs per Bin Type</h1>
          {/* <Pie data={this.pieData2} legend={legendOps} ref={this.chart1Ref}/> */}
          <Pie data={pieData1} legend={legendOps} />
        </div>
        <div className="chart">
          <h1># of Pickups Per Bin Type</h1>
          <Pie data={pieData2} legend={legendOps} />
        </div>
      </div>
    </div>
  )
}

export default PickupView
