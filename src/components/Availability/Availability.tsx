import { useState } from 'react'
import { Checkbox, MenuItem, Select } from '@mui/material'
import {
  ExpandMoreRounded,
  DeleteOutline,
  AddRounded,
  ContentCopyOutlined,
} from '@mui/icons-material'
import './Availability.scss'
import {
  defaultAvailability,
  Timezones,
  timeOptions,
  // weekdays,
} from './utils/data'

export const Availability: React.FC = (): JSX.Element => {
  const [timezone, setTimezone] = useState(Timezones.ET)

  return (
    <div className='availability-container'>
      <TimeZoneInputBanner timezone={timezone} setTimezone={setTimezone} />
      <p>Set weekly availability</p>
      <hr />
      <DayAvailabilityInputBanner day='SUN' />
      <DayAvailabilityInputBanner day='MON' />
      <DayAvailabilityInputBanner day='TUE' />
      <DayAvailabilityInputBanner day='WED' />
      <DayAvailabilityInputBanner day='THU' />
      <DayAvailabilityInputBanner day='FRI' />
      <DayAvailabilityInputBanner day='SAT' />
    </div>
  )
}

const TimeZoneInputBanner = ({ setTimezone, timezone }) => {
  return (
    <div className='timezone-input-container'>
      <h2>Time zone</h2>
      {/* TODO: define this select component elsewhere? */}
      <Select
        defaultValue={timezone}
        disableUnderline
        IconComponent={ExpandMoreRounded}
        sx={{
          color: '#022888',
          fontSize: '12px',
          '& .MuiSvgIcon-root': { color: '#022888' },
        }}
        value={timezone}
        variant='standard'
        onChange={e => setTimezone(e.target.value)}
      >
        {Object.keys(Timezones).map(zone => (
          <MenuItem value={Timezones[zone]}>{Timezones[zone]}</MenuItem>
        ))}
      </Select>
    </div>
  )
}

const getNextTimeslotRange = availability => {
  const lastAvailableTime = availability[availability.length - 1][1]
  const index = timeOptions.indexOf(lastAvailableTime)
  const start = timeOptions[index + 1]
  const end = timeOptions[index + 2]
  if (['11:00 PM', '11:30 PM'].includes(lastAvailableTime)) {
    return [timeOptions[0], timeOptions[1]]
  } else {
    return [start, end]
  }
}

const DayAvailabilityInputBanner = ({ day }) => {
  const [days, setDays] = useState(defaultAvailability)

  const handleCheck = e => {
    setDays({
      ...days,
      [e.target.name]: {
        available: !days[e.target.name].available,
        availability: [...days[e.target.name].availability],
      },
    })
  }

  const handleAddSlot = (e, day) => {
    const availability = days[day].availability
    const nextSlot = getNextTimeslotRange(availability)
    console.log(nextSlot)

    setDays({
      ...days,
      [day]: {
        availability: [...days[day].availability, nextSlot],
        available: days[day].available,
      },
    })
  }

  return (
    <div>
      <div className='day-availability-input-banner'>
        <div className='left-banner'>
          <Checkbox
            name={day}
            onChange={e => handleCheck(e)}
            sx={{ color: '#022888', '&.Mui-checked': { color: '#022888' } }}
          />
          <h2>{day}</h2>
          {days[day]['available'] ? (
            <TimeSlotInput
              day={day}
              days={days}
              setDays={setDays}
              slots={days[day].availability}
            />
          ) : (
            <h2>Unavailable</h2>
          )}
        </div>
        <div className='right-banner'>
          <AddRounded onClick={e => handleAddSlot(e, day)} />
          <ContentCopyOutlined />
        </div>
      </div>
      <hr />
    </div>
  )
}

// const consolidateAvailability = (availability: string[][], eventTarget) => {
// }

const subOptions = (startTime, isStart) => {
  const index = timeOptions.indexOf(startTime)
  return isStart ? timeOptions.slice(index) : timeOptions.slice(index + 1)
}

const TimeSlotInput = ({ day, days, setDays, slots }) => {
  const handleTimeChange = e => {
    // update availability arrays for day
    // trigger a
    const context = e.target.name.split('-')
    const day = context[0]
    const frame = Number(context[1])
    const index = context[2] === 'start' ? 0 : 1
    const oldAvailability = days[day].availability
    const newAvailability = oldAvailability
    newAvailability[frame][index] = e.target.value
    setDays({
      ...days,
      [day]: {
        available: days[day].available,
        availability: newAvailability,
      },
    })
    console.log(days)
  }

  const handleDelete = (day, idx) => {
    const oldAvailability = days[day].availability
    const newAvailalability = oldAvailability
    newAvailalability.splice(idx, 1)
    setDays({
      ...days,
      [day]: {
        available: days[day].available,
        availability: newAvailalability,
      },
    })
  }

  return (
    <div>
      {slots.map((slot, idx) => (
        <div className='timeslot-input'>
          {/* Make a new custom component for these that takes in arguments like day, start/end, to keep this clean */}
          <Select
            name={`${day}-${idx}-start`}
            onChange={e => handleTimeChange(e)}
            size='small'
            defaultValue={slot[0]}
            value={days[day].availability[idx][0]}
            inputProps={{ sx: { padding: '8px 13px !important' } }}
            sx={{
              padding: '0 !important',
              fontSize: '14px',
              '& .MuiSvgIcon-root': { display: 'none' },
              backgroundColor: '#fefefe',
              '.MuiOutlinedInput-notchedOutline': { border: 0 },
              width: '87px',
            }}
          >
            {subOptions(slot[0], true).map(time => (
              <MenuItem value={time}>{time}</MenuItem>
            ))}
          </Select>
          <p>--</p>
          <Select
            name={`${day}-${idx}-end`}
            onChange={e => handleTimeChange(e)}
            size='small'
            defaultValue={days[day].availability[idx][1]}
            value={days[day].availability[idx][1]}
            inputProps={{ sx: { padding: '8px 13px !important' } }}
            sx={{
              fontSize: '14px',
              '& .MuiSvgIcon-root': { display: 'none' },
              backgroundColor: '#fefefe',
              '.MuiOutlinedInput-notchedOutline': { border: 0 },
              width: '87px',
            }}
          >
            {subOptions(slot[0], false).map(time => (
              <MenuItem value={time}>{time}</MenuItem>
            ))}
          </Select>
          <DeleteOutline
            className='icon'
            onClick={() => handleDelete(day, idx)}
          />
        </div>
      ))}
    </div>
  )
}
