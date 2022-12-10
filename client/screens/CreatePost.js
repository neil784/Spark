import { View, TextInput, StyleSheet, Text, Alert } from 'react-native';
import React from 'react';
import { POLISHED_PINE, GAINSBORO, MUSTARD } from '../styles/palette';
import DropDownPicker from 'react-native-dropdown-picker';
import NumericInput from 'react-native-numeric-input';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useToast } from 'react-native-toast-notifications';

export default function CreatePost({ navigation, user_id }) {
  DropDownPicker.setMode('BADGE');
  const [title, setTitle] = React.useState('');
  const [biography, setBiography] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [members, setMembers] = React.useState(3);
  const [skillsets, setSkillsets] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [possibleSkills, setPossibleSkills] = React.useState([
    {
      label: 'React',
      value: 'react',
    },
    {
      label: 'React Native',
      value: 'react native',
    },
    {
      label: 'UI/UX Design',
      value: 'ui/ux design',
    },
    {
      label: 'Product Management',
      value: 'product management',
    },
  ]);
  const [timeline, setTimeline] = React.useState(6); //https://github.com/miblanchard/react-native-slider
  const toast = useToast();

  const verify = () => {
    console.log(members);
    if (title === '' || biography === '') {
      Alert.alert('Invalid Form', 'All fields must be non-empty.', [
        { text: 'Ok' },
        { text: 'Cancel', style: 'cancel' },
      ]);
      return false;
    }

    if (description.length < 50) {
      Alert.alert('Invalid Form', 'Please write a longer description.', [
        { text: 'Ok' },
        { text: 'Cancel', style: 'cancel' },
      ]);
      return false;
    }

    return true;
  };

  const postToDB = async () => {
    const shouldPost = verify();
    if (shouldPost) {
      await fetch(`http://localhost:4000/api/projects/create`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          description: description,
          skillset: skillsets,
          timeline: timeline,
          creator: user_id,
          membersNeeded: members,
        }),
      }).catch((error) => console.log(error));
      toast.show('Brainstorm Posted!', {
        type: 'success',
        placement: 'top',
        duration: 'zoom-in',
        duration: 2500,
      });
      navigation.navigate('Home');
    }
  };

  return (
    <ScrollView
      style={styles.form}
      contentContainerStyle={{ alignItems: 'center' }}
    >
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder={'Title'}
      />
      <TextInput
        style={styles.input}
        value={biography}
        onChangeText={setBiography}
        placeholder={'Biography'}
      />
      <TextInput
        multiline
        style={[styles.input, { paddingBottom: 20, paddingTop: 20 }]}
        value={description}
        onChangeText={setDescription}
        placeholder={'Description'}
      />
      <View
        style={{
          width: '80%',
          alignItems: 'stretch',
          justifyContent: 'center',
          marginBottom: '5%',
          backgroundColor: 'white',
          padding: '5%',
          borderRadius: '5%',
        }}
      >
        <Text style={{ color: 'gray', marginBottom: '1%' }}>
          Members needed: {members}
        </Text>
        <NumericInput
          value={members}
          onChange={(value) => setMembers(value)}
          totalWidth={240}
          totalHeight={30}
          iconSize={25}
          step={1}
          valueType="real"
          rounded
          textColor={POLISHED_PINE}
          iconStyle={{ color: 'white' }}
          rightButtonBackgroundColor={POLISHED_PINE}
          leftButtonBackgroundColor={POLISHED_PINE}
        />
        <Text style={{ color: 'gray', marginTop: '10%', marginBottom: '1%' }}>
          Timeline: {timeline} months
        </Text>
        <NumericInput
          value={timeline}
          onChange={(value) => setTimeline(value)}
          totalWidth={240}
          totalHeight={30}
          iconSize={25}
          step={1}
          valueType="real"
          rounded
          textColor={POLISHED_PINE}
          iconStyle={{ color: 'white' }}
          rightButtonBackgroundColor={POLISHED_PINE}
          leftButtonBackgroundColor={POLISHED_PINE}
        />
      </View>
      <DropDownPicker
        multiple={true}
        min={1}
        open={open}
        value={skillsets}
        items={possibleSkills}
        setOpen={setOpen}
        setValue={setSkillsets}
        setItems={setPossibleSkills}
        style={styles.dropdown}
        textStyle={styles.dd_text}
      />
      <TouchableOpacity style={styles.btn} onPress={postToDB}>
        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
          Post Brainstorm
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    marginTop: '5%',
  },
  input: {
    backgroundColor: GAINSBORO,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '80%',
    borderRadius: '5%',
    marginBottom: '5%',
    color: POLISHED_PINE,
  },
  dropdown: {
    width: '80%',
    alignSelf: 'center',
    borderRadius: '5%',
    borderWidth: 0,
  },
  dd_text: {
    fontSize: 14,
    color: POLISHED_PINE,
  },
  btn: {
    marginTop: '10%',
    backgroundColor: MUSTARD,
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 30,
  },
});
