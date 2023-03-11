import { message } from 'antd'
import { makeAutoObservable } from 'mobx'
import { homeStore } from '../../store'

export class Store {
  constructor() {
    makeAutoObservable(this)
  }

  value = ''
  isCompositionStarted = false

  onSubmit = () => {
    try {
      this.value = this.value.trim()
      if (this.value === '') return
      homeStore.conversation?.check()
      homeStore.conversation?.sendMessage(this.value)
      this.value = ''
    } catch (err: any) {
      message.info(err.message)
    }
  }
}

