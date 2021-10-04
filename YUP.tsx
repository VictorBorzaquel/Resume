const schema = Yup.object().shape({
  email: Yup
    .string()
    .required('E-mail obrigatório')
    .email('Digite um e-mail válido'),
  password: Yup
    .string()
    .required('Senha Obrigatória'),
});

const schema = Yup.object().shape({
  password: Yup
    .string()
    .matches(/\w*[a-z]\w*/, "Coloque pelo menos uma letra minuscula")
    .matches(/\w*[A-Z]\w*/, "Coloque pelo menos uma letra maiuscula")
    .matches(/\d/, "Coloque pelo menos um numero")
    .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Coloque pelo menos um caractere especial")
    .min(8, ({ min }) => `A senha deve ter no mínimo ${min} caracteres`)
    .required('Coloque uma senha'),
  passwordVerify: Yup
    .string()
    .oneOf([Yup.ref('password')], 'As senhas tem que ser iguais')
    .required('Você precisa confirmar a senha'),
});

async function handleSignIn() {
  try {
    await schema.validate({ email, password });

    signIn({ email, password });

  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      Alert.alert('Opa', error.message);
      setShowPasswordAlert(true);
    } else {
      Alert.alert(
        'Erro na autentificação',
        'Verifique o E-mail e a senha'
      )
      setShowPasswordAlert(true);
    }
  }
}