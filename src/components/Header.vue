<template>
    <header class="header">
        <div class="header__logo">
            <img class="header__logo-arrow" src="../assets/icons/arrow-left.svg" alt="arrow icon">
            <img src="../assets/icons/logo.svg" alt="logo">
        </div>
        <h2 class="header__title">RichyRich</h2>
        <div class="header__notification">
            <img src="../assets/icons/notification.svg" alt="notification">
            <span class="header__notification-count">2</span>
        </div>
    </header>
</template>

<script>
export default {
    name: 'Header',
}
</script>