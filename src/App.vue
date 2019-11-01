<script>

export default {
  async created () {
    // let res = get('/weapp/demo')
    // console.log(123,res)
    console.log('小程序开始了')
  }
}
</script>

<style>
.text-footer{
  text-align: center;
  font-size: 12px;
}
.text-primary {
  color: #ea5149
}
.btn {
  color: white;
  background: #ea5a49;
  margin-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 2px;
  font-size: 16px;
  line-height: 40px;
  height: 40px;
  width: 100%;
}
.btn:active{
  background: #ea9a00;
}
</style>
