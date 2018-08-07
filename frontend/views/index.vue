<style scoped lang="less">
.section{
    background: #f5f7f9;
    border-radius: 4px;
    overflow: hidden;
    min-height: 100%;
}
.section-header {
    display: flex;
    background: transparent;
    position: relative;
}
.section-main {
    width: 100%;
}
.section-logo{
    justify-content: flex-start;
    align-content: center; 
    margin: 5px auto;
    float: left;
    background-size: 100%;
    display: flex;
    width: 100%;
    max-width: 15em;
    max-height: 5em;
    img {
        width: 100%;
    }
}
</style>
<template>
    <section class="section">
        <section class="section-main">
            <header class="section-header">
                <div class="section-logo">
                    <img src="../assets/logo.svg" alt="logo"/>
                </div>
            </header>
            <article :style="{padding: '15px 15px'}">
                <section>
                    <router-view />
                </section>
            </article>
        </section>
    </section>
</template>
<script>
    export default {
        data () {
            return {
                login: {
                    username: '',
                    passwd: ''
                },
            };
        },
        computed: {
            loginUser () {
                return this.$store.getters.userInfo;
            },
            name () {
                return this.loginUser ? this.loginUser.name : '';
            },
            isLogin () {
                return this.$store.getters.isLogin;
            },
        },
        mounted () {
        },
        methods: {
            logoutAccount() {
                this.$store.dispatch('logout', (rsp, err) => {
                    if (!rsp || rsp.state != 0) {
                        err = (err && err.message) || rsp.msg
                    }
                })
            },
            loginSubmit() {
                 this.$refs['loginForm'].validate((valid) => {
                    if (valid) {
                        this.login_loading = true;
                        this.$store.dispatch('login', {
                            user: this.login,
                            callback: (rsp, err) => {
                                this.login_loading = false;
                                if (rsp && rsp.state == 0) {
                                    this.loginModel = false;
                                    this.ulActive = '1-1';
                                } else {
                                    err = (err && err.message) || rsp.msg
                                    this.$Message.error(err);
                                }
                            }
                        })
                    }
                })
            }
        }
    }
</script>