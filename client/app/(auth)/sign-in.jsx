import { useState } from 'react'
import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { styles } from '@/assets/styles/auth.styles.js'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/colors'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'


export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
        if (err.errors?.[0]?.code === "form_password_incorrect") {
            setError("Incorrect email or password. Please try again.")
        } else {
            setError("An error occurred while signing in.")
        }
    }
  }

  return (
    <KeyboardAwareScrollView 
    style={{ flex: 1}}
    contentContainerStyle={{ flexGrow: 1}}
    enableOnAndroid={true}
    enableAutomaticScroll={true}>

    <View style={styles.container}>
        <Text style={styles.title}>Sign in</Text>

        {error ? (
          <View style={styles.errorBox}>
          <Ionicons name="alert-circle" size={24} color={COLORS.expense}/>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={() => setError("")}>
            <Ionicons name="close" size={24} color={COLORS.textLight}/>
          </TouchableOpacity>

          </View>
        ): null}

      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        style={[styles.input, error && styles.errorInput]}
        placeholderTextColor="#999"
        placeholder="Enter email"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <TextInput
        value={password}
        style={[styles.input, error && styles.errorInput]}
        placeholderTextColor="#999"
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <TouchableOpacity style={styles.button} onPress={onSignInPress}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Don&apos;t have an account?</Text>
        <Link href="/sign-up">
          <Text style={styles.linkText}>Sign up</Text>
        </Link>
      </View>

    </View>
      
    </KeyboardAwareScrollView>
  )
}