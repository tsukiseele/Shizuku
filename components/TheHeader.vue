<template>
  <div class="header">
    <div class="header--card">
      <div class="header--title">
        <span>{{ title }}</span>
      </div>
      <div class="header--subtitle">
        <span>{{ subtitleTyping.text }}</span>
        <span
          :class="{ 'subtitle--cursor-vague': subtitleTyping.vague }"
          class="subtitle--cursor"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    title: "雫『Shizuku』",
    subtitle: [
      "这里是tsukiseele的博客"
      /*
      "明日から、幸せな人になろう。",
      "馬を飼って、薪を割って、世界を旅して。",
      "明日から、食糧と野菜に気を使ってみよう。",
      "私の家は、春に花咲く、この海辺に。",
      "明日から、親しい人には手紙を書いて、",
      "彼らに私の幸福を教えてあげよう。",
      "あの稲妻のような幸福が、教えてくれたことを、",
      "全ての人に教えて、",
      "全ての川と山に、一つずつ暖かい名を付けて。",
      "見知らぬ人、私はあなたのためにも祝福しよう。",
      "あなたに素晴らしい未来があることを、",
      "あなたとあなたの恋人が結ばれることを、",
      "あなたがこの平凡な世界で幸せになる事を、願って。",
      "そして私はただ、春に花咲く、この海辺に。",*/
    ],
    subtitleTyping: {
      text: "",
      index: 0, // 数组索引
      state: true,
      vague: false,
    },
  }),
  methods: {
    typing() {
      var sleep = 0;
      // 输入时，去除光标闪烁
      if (this.subtitleTyping.vague) this.subtitleTyping.vague = false;
      // 输入中
      if (this.subtitleTyping.state) {
        this.subtitleTyping.text = this.subtitle[
          this.subtitleTyping.index
        ].slice(0, this.subtitleTyping.text.length + 1);
        sleep = 180;
        // 删除中
      } else {
        this.subtitleTyping.text = this.subtitle[
          this.subtitleTyping.index
        ].slice(0, this.subtitleTyping.text.length - 1);
        sleep = 50;
      }
      // 输入前后调用
      if (
        this.subtitleTyping.text.length == 0 ||
        this.subtitleTyping.text.length ==
          this.subtitle[this.subtitleTyping.index].length
      ) {
        this.subtitleTyping.state = !this.subtitleTyping.state;
      }
      // 开始输入前调用
      if (this.subtitleTyping.text.length == 0) {
        this.subtitleTyping.index =
          ++this.subtitleTyping.index < this.subtitle.length
            ? this.subtitleTyping.index
            : 0;
        sleep = 500;
      }
      // 输入完毕后调用
      if (
        this.subtitleTyping.text.length ==
        this.subtitle[this.subtitleTyping.index].length
      ) {
        this.subtitleTyping.vague = true;
        sleep = 2000;
      }
      setTimeout(this.typing, sleep);
    },
    async getHitokoto() {
      let hitokoto = await this.$axios.$get('https://v1.hitokoto.cn/');
      if (hitokoto) {
        console.log(hitokoto);
        this.subtitle.unshift(`出自 ${hitokoto.from}`);
        this.subtitle.unshift(hitokoto.hitokoto);
      }
    }
  },
  mounted() {
    this.getHitokoto();
    this.typing();
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
}

.header--card {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  color: white;

  .header--title {
    font-size: 2.2rem;
    font-weight: 500;
    cursor: pointer;
  }

  .header--subtitle {
    font-size: 1.4rem;
    cursor: pointer;

    .subtitle--cursor {
      height: 100%;
      border-left: white solid 1px;
      margin-left: 0.2rem;
    }
    .subtitle--cursor-vague {
      animation: cursor-vague 1s ease infinite;
    }
  }
}

.header--subtitle {
}
@keyframes cursor-vague {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>