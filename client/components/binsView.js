/* eslint-disable react/display-name */
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
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import {
  Toolbar,
  AppBar,
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  TextField,
  Snackbar
} from '@material-ui/core'
import Backdrop from '@material-ui/core/Backdrop'
import Card from '@material-ui/core/Card'
import {makeStyles} from '@material-ui/core/styles'

const labels = [
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

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}))

const makeQtyData = bins => {
  const data = []
  const count = {}
  bins.forEach(bin => {
    if (count[bin.type]) {
      count[bin.type] += 1
    } else {
      count[bin.type] = 1
    }
  })
  Object.keys(count).forEach(type => {
    data.push({type, qty: count[type]})
  })
  return data
}

const BinsView = ({bins}) => {
  const classes = useStyles()
  const [type, setType] = React.useState('')
  const [qty, setQty] = React.useState(0)
  const columns = [
    {title: 'Qty', field: 'qty'},
    {title: 'Type', field: 'type'},
    {title: 'Notes'}
  ]

  const [open, setOpen] = React.useState(false)
  const [open2, setOpen2] = React.useState(false)
  const [date, setDate] = React.useState('')
  const [repeat, setRepeat] = React.useState('no')
  const [open3, setOpen3] = React.useState(false)
  const handleRequest = () => {
    setOpen(false)
    setOpen2(false)
  }
  const handleToggle = () => {
    setOpen(!open)
  }
  const handleToggle2 = () => {
    setOpen2(!open2)
  }
  const handleSubmit = () => {
    setOpen3(true)
    handleRequest()
  }
  const handleClose = () => {
    setOpen3(false)
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{display: 'flex', justifyContent: 'space-around'}}>
          <Button className="nav-button" onClick={handleToggle}>
            Request a new bin
          </Button>
          <Button className="nav-button" onClick={handleToggle2}>
            Schedule a pickup
          </Button>
        </Toolbar>
      </AppBar>
      <Table
        data={makeQtyData(bins)}
        title="My Bins"
        icons={tableIcons}
        columns={columns}
      />
      <Backdrop className={classes.backdrop} open={open}>
        <Card className="bin-request-card">
          <h2>Select Your Bin Type and Quantity</h2>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: 'column'
            }}
          >
            <FormControl>
              <InputLabel id="catgeory">Category</InputLabel>
              <Select
                labelId="category"
                value={type}
                onChange={e => setType(e.target.value)}
              >
                {labels.map(label => {
                  return (
                    <MenuItem key={label} value={label}>
                      {label}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="qty">Quantity</InputLabel>
              <Select
                labelId="qty"
                value={qty}
                onChange={e => setQty(e.target.value)}
              >
                {[0, 1, 2, 3, 4, 5].map(label => {
                  return (
                    <MenuItem key={label} value={label}>
                      {label}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
            <br />
            <button type="button" onClick={handleRequest}>
              Cancel
            </button>
            <hr />
            <button type="button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </Card>
      </Backdrop>
      <Backdrop className={classes.backdrop} open={open2}>
        <Card className="bin-request-card">
          <h2>Select your bin type and pickup date</h2>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: 'column'
            }}
          >
            <FormControl>
              <InputLabel id="category">Category</InputLabel>
              <Select
                labelId="category"
                value={type}
                onChange={e => setType(e.target.value)}
              >
                {labels.map(label => {
                  return (
                    <MenuItem key={label} value={label}>
                      {label}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
            <FormControl>
              <TextField
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </FormControl>
            <FormControl>
              <InputLabel id="qty2">Quantity</InputLabel>
              <Select
                labelId="qty2"
                value={qty}
                onChange={e => setQty(e.target.value)}
              >
                {[0, 1, 2, 3, 4, 5].map(label => {
                  return (
                    <MenuItem key={label} value={label}>
                      {label}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="repeat">Recurring Pickup?</InputLabel>
              <Select
                labelId="repeat"
                value={repeat}
                onChange={e => setRepeat(e.target.value)}
              >
                {['no', 'one week', 'two weeks', 'one month', '3 months'].map(
                  label => {
                    return (
                      <MenuItem key={label} value={label}>
                        {label}
                      </MenuItem>
                    )
                  }
                )}
              </Select>
            </FormControl>
            <br />
            <button
              type="button"
              className="nav-button"
              onClick={handleRequest}
            >
              Cancel
            </button>
            <hr />
            <button type="submit" className="nav-button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </Card>
      </Backdrop>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={open3}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Request Received!"
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  )
}

export default BinsView
