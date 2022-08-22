const Login = require("../models/loginModel");

exports.index = (req, res) => {
    console.log(req.session.user);
    res.render('login');
};

exports.register = async function(req, res) {
    
try{
    const login = new Login(req.body);
    await login.register();
    
    if(login.errors.length > 0) {
        req.flash('errors',login.errors);
        req.session.save(function(){
          return res.redirect('back');
        });
        return;
    }

    req.flash('sucess', 'Seu usuario foi criado com sucesso');
    req.session.save(function(){
        return res.redirect('back');
    });

}
    catch(e){
    console.log(e);
    return res.render('404');
    }
};

exports.login = async function(req, res) {
    
    try{
        console.log(req.body);
        const login = new Login(req.body);
        await login.login();
        
        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function(){
              return res.redirect('back');
            });
            return;
        }
        
    
        req.flash('sucess', 'Você fez Login');
        req.session.user = login.user;
        req.session.save(function(){
            return res.redirect('back');
        });
    
    }
        catch(e){
        console.log(e);
        return res.render('404');
        }
    };