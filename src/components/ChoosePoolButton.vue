<template>
    <div class="choose-pool-button">
        <div>
        Example
        <i class="fas fa-angle-right"></i>
        </div>
    </div>
</template>

<style scoped lang='scss'>

.choose-pool-button {
    transition: 0.5s;
    background-color: inherit;
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.094);
    width: 80%;
    margin: auto;
    border-radius: 20px;
    height: 50px;
    align-items: center;
    display: flex;
    cursor: pointer;

    div {
        font-size: 16px;
        margin-left: 10px;
        font-weight: 600;

        i {
            margin-left: 20px;
        }

    }  

}

.choose-pool-button:hover {
    width: 82%;
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.211);
}

</style>