() => (
  <>
    <Input
      placeholder="E-Mail"
      keyboardType="email-address"
      autoCorrect={false}
      autoCapitalize="none"
      onChangeText={setEmail}
      value={email}

      iconName="mail"
    />
    <Input
      placeholder="Senha"
      autoCorrect={false}
      autoCapitalize="none"
      onChangeText={setPassword}
      value={password}

      iconName="lock"
      password
    />
  </>
)
