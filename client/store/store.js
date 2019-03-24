/* eslint-disable */
import {
  observable,
  action,
} from 'mobx'
import {
  createStore,
} from 'redux'

/* redux start */
// const ADD_ACTION = 'ADD'
// const add = (num) => {
//   return {
//     type: ADD_ACTION,
//     num,
//   }
// }

// const initialState = {
//   count: 0,
// }

// const reducers = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_ACTION:
//       return Object.assign({}, state, { // 返回新对象， 触发所有的component都得去渲染， 但是有牛逼的differ算法
//         count: state.counnt + action.num,
//       })
//     default:
//       return state
//   }
// }

// const reduxStore = createStore(reducers)
// reduxStore.dispatch(add(1))
/* redux end */

/* mobx */
const mobxStore = observable({
  count: 0,
  add: action(function(num) {
    this.count += num
  })
})

mobxStore.add(1)