import React from 'react'
import { View } from 'react-native'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { black } from './colors'

export function getDailyReminderValue(){
  return{
    today: ":wave: Não esqueça de adicionar seus dados hoje!"
  }
}

export function getMetricMetaInfo (metric) {
  const info = {
    run: {
      displayName: 'Corrida',
      max: 50,
      unit: 'milhas',
      step: 1,
      type: 'steppers',
      getIcon() {
        return (
          <View>
            <MaterialIcons
              name='directions-run'
              color={black}
              size={35}
            />
          </View>
        )
      }
    },
    bike: {
      displayName: 'Ciclismo',
      max: 100,
      unit: 'milhas',
      step: 1,
      type: 'steppers',
      getIcon() {
        return (
          <View>
            <MaterialCommunityIcons
              name='bike'
              color={black}
              size={32}
            />
          </View>
        )
      }
    },
    swim: {
      displayName: 'Natação',
      max: 9900,
      unit: 'metros',
      step: 100,
      type: 'steppers',
      getIcon() {
        return (
          <View>
            <MaterialCommunityIcons
              name='swim'
              color={black}
              size={35}
            />
          </View>
        )
      }
    },
    sleep: {
      displayName: 'Dormir',
      max: 24,
      unit: 'horas',
      step: 1,
      type: 'slider',
      getIcon() {
        return (
          <View>
            <FontAwesome
              name='bed'
              color={black}
              size={30}
            />
          </View>
        )
      }
    },
    eat: {
      displayName: 'Comer',
      max: 10,
      unit: 'avaliação',
      step: 1,
      type: 'slider',
      getIcon() {
        return (
          <View>
            <MaterialCommunityIcons
              name='food'
              color={black}
              size={35}
            />
          </View>
        )
      }
    },
  }

  return typeof metric === 'undefined'
    ? info
    : info[metric]
}

export function isBetween (num, x, y) {
  if (num >= x && num <= y) {
    return true
  }

  return false
}

export function calculateDirection (heading) {
  let direction = ''

  if (isBetween(heading, 0, 22.5)) {
    direction = 'North'
  } else if (isBetween(heading, 22.5, 67.5)) {
    direction = 'North East'
  } else if (isBetween(heading, 67.5, 112.5)) {
    direction = 'East'
  } else if (isBetween(heading, 112.5, 157.5)) {
    direction = 'South East'
  } else if (isBetween(heading, 157.5, 202.5)) {
    direction = 'South'
  } else if (isBetween(heading, 202.5, 247.5)) {
    direction = 'South West'
  } else if (isBetween(heading, 247.5, 292.5)) {
    direction = 'West'
  } else if (isBetween(heading, 292.5, 337.5)) {
    direction = 'North West'
  } else if (isBetween(heading, 337.5, 360)) {
    direction = 'North'
  } else {
    direction = 'Calculating'
  }

  return direction
}

export function timeToString (time = Date.now()) {
  const date = new Date(time)
  const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  return todayUTC.toISOString().split('T')[0]
}
