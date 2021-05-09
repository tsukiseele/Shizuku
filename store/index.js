export const state = () => ({
  user: null,
  live2dText: "",
  scroll: {
    pos: 0,
    change: 0
  },
  header: {
    title: "",
    subtitle: "",
    isFull: false,
    isHide: false,
  }
})

export const getters = {
  user(state) {
    return state.user;
  },
  live2dText(state) {
    return state.live2dText;
  },
  scroll(state) {
    return state.scroll;
  },
  header(state) {
    return state.header;
  }
}

export const mutations = {
  user(state, user) {
    state.user = user;
  },
  live2dText(state, msg) {
    state.live2dText = msg;
  },
  scroll(state, scroll) {
    state.scroll = scroll;
  },
  header(state, header) {
    state.header = header;
  }
}
