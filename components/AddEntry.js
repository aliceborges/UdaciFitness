import React, {Component} from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import {getMetricMetaInfo, timeToString} from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciStepper from './UdaciStepper'
import DateHeader from './DateHeader'
import { Ionicons } from '@expo/vector-icons'
import TextButton from './TextButton'
import { submitEntry, removeEntry } from '../utils/api'

function SubmitBtn({onPress}){
  return(
    <TouchableOpacity
      onPress = { onPress }
    >
      <Text>Enviar</Text>
    </TouchableOpacity>
  )
}

export default class AddEntry extends Component {

  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  }

  submit = () => {
    const key = timeToString()
    const entry = this.state

    this.setState(() => ({ run:0, bike:0, swim:0, sleep:0, eat:0 }))

    submitEntry({key, entry})
  }

  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric)
    this.setState((state) => {
      const count = state[metric] + step

      return{
        ...state,
        [metric] : count > max ? max : count
      }
    })
  }

  decrement = (metric) => {
    this.setState((state) => {
      const count = state[metric] - getMetricMetaInfo(metric).step

      return{
        ...state,
        [metric] : count > 0 ? 0 : count
      }
    })
  }

  slide = (metric, value) => {
    this.setState(() => ({
      [metric]: value
    }))
  }

  reset = () => {
    const key = timeToString()

    removeEntry(key)
  }

  render(){

    const metaInfo = getMetricMetaInfo()


    return(
      <View>
        <DateHeader date={(new Date()).toLocaleDateString()}/>
        {Object.keys(metaInfo).map((key)=> {
          const { getIcon, type, ...rest } = metaInfo[key]
          const value = this.state[key]

          if (this.props.alreadyLogged){
            return(
              <View>
                <Ionicons
                  name={'ios-happy-outline'}
                  size={100}
                />
                <Text>Você já adicionou suas informações de hoje.</Text>
                <TextButton onPress={this.reset}>
                  Reenviar
                </TextButton>
            </View>
            )
          }

          return(
            <View key={key}>
              {getIcon()}
              {type === 'slider'
                ? <UdaciSlider
                    value = { value }
                    onChange = {(value) => this.slide(key, value)}
                    {...rest}
                  />
                : <UdaciStepper
                    value = { value }
                    onIncrement={()=>this.increment(key)}
                    onDecrement={()=>this.decrement(key)}
                    {...rest}
                  />
              }
            </View>
          )
        })}
      <SubmitBtn onPress = { this.submit }/>
      </View>
    )
  }
}
