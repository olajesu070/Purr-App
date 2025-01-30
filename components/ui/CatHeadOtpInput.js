import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function CatHeadOtpInput({ length = 6, onComplete }) {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (text.length > 1) return; // Allow only one character
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to the next input
    if (text && index < length - 1) {
      inputs.current[index + 1].focus();
    }

    // Trigger onComplete callback
    if (newOtp.every((digit) => digit !== '')) {
      onComplete && onComplete(newOtp.join(''));
    }
  };

  const handleBackspace = (text, index) => {
    if (!text && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((_, index) => (
        <View key={index} style={styles.catHeadContainer}>
          {/* <Svg
            width={50}
            height={50}
            viewBox="0 0 54 51"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M27 1 C10 1, 1 15, 1 30 C1 45, 10 51, 27 51 C44 51, 53 45, 53 30 C53 15, 44 1, 27 1 Z"
              stroke={otp[index] ? "#B976FF" : "#ccc"} // Change color dynamically
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg> */}
          <Svg
            width="54"
            height="54"
            viewBox="0 0 51 54"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M20.445 7.64c-.071-.03-.161-.085-.31-.22a13.066 13.066 0 0 1-.603-.606l-.36.346.36-.346C17.78 4.984 15.833 3.416 13.98 2.3 12.143 1.195 10.338.5 8.88.5c-1.001 0-1.864.659-2.553 1.632-.696.983-1.282 2.374-1.724 4.056-.884 3.37-1.219 8.014-.617 13.191.057.49.068.627.048.737-.02.11-.082.243-.316.7l.446.227-.446-.227A27.264 27.264 0 0 0 1.2 28.17C.904 29.74.75 31.34.75 32.945c0 2.855 1.8 6.27 4.893 9.183 3.109 2.928 7.579 5.405 13.047 6.364h.005l.082-.493-.082.493h.002l.007.002.026.004.098.016.365.056c.309.047.74.109 1.233.171.978.123 2.216.25 3.198.25.983 0 2.22-.127 3.199-.25a52.24 52.24 0 0 0 1.597-.226l.098-.016.026-.005H28.553v-.001L28.473 48C39.212 46.12 46 38.274 46 32.945c0-4.13-1.046-8.234-2.904-11.878-.216-.424-.324-.636-.36-.836-.037-.2-.01-.427.042-.882l.497.057c.599-5.18.236-9.832-.677-13.208-.455-1.686-1.055-3.08-1.761-4.065C40.139 1.16 39.27.5 38.268.5c-1.457 0-3.261.695-5.099 1.8-1.852 1.115-3.797 2.683-5.55 4.511-.267.279-.449.468-.6.605a1.09 1.09 0 0 1-.31.218c-.073.03-.178.052-.378.06-.204.01-.467.002-.853-.01a62.74 62.74 0 0 0-1.851-.025c-.696 0-1.343.01-1.945.029-.387.012-.652.02-.857.012a1.13 1.13 0 0 1-.38-.06Z"
              stroke={otp[index] ? '#B976FF' : '#ccc'}
              stroke-width="5"
            />
          </Svg>
          <TextInput
            ref={(ref) => (inputs.current[index] = ref)}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={1}
            value={otp[index]}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) =>
              nativeEvent.key === 'Backspace' && handleBackspace('', index)
            }
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  catHeadContainer: {
    width: 54,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    position: 'absolute',
    width: '80%',
    height: '80%',
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
    backgroundColor: 'transparent',
  },
});
