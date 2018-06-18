module.exports = {
    email: "testYanSocial@gmail.com",
    password: "testYanSocial11",
    protocol: "smtp.gmail.com",
    from: "Социальная сеть Яна Анциферова",
    subject: "Регистрация на сайте",
    getHTMLMessage: function(newUser){
        return `<html>
            <p>Здравствуйте, ${newUser.firstname}. Вы успешно прошли регистрацию на сайте.</p>
            <p>Ваш логин: ${newUser.email}<br/>
                Ваш пароль: ${newUser.password}
            </p>
        </html>`
    }
}