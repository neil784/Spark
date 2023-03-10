//Card View that contains information about a project that is shown in the home page/feed.
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import { BLOND, POLISHED_PINE } from '../styles/palette';
import UserAvatar from 'react-native-user-avatar';

export default function ProjectCardFeed({
  title,
  bio,
  creator_name,
  creator_username,
  description,
  skillset,
  members_needed,
  timeline,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.header}>
          <UserAvatar
            style={{ width: 70, height: 70, borderRadius: 50, marginRight: 20 }}
            size={50}
            name={creator_name || 'John Doe'}
          />
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}>
              {creator_name}•
              <Text
                style={{ fontStyle: 'italic', fontFamily: 'Poppins-Regular' }}
              >
                {creator_username}
              </Text>
            </Text>
            <Text style={{ fontSize: 11, fontFamily: 'Poppins-Regular' }}>
              Timeline: {timeline}
            </Text>
          </View>
        </View>
        <Text style={styles.bio}>{bio}</Text>
        <View style={styles.skills}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableHighlight style={[styles.singleSkill, styles.members]}>
              <Text style={[styles.pill, styles.members]}>
                {members_needed}
              </Text>
            </TouchableHighlight>

            {skillset &&
              skillset.map((skill) => {
                return (
                  <TouchableHighlight key={skill} style={styles.singleSkill}>
                    <Text style={styles.pill}>
                      {skill.substring(0, 1).toUpperCase() +
                        skill.substring(1).toLowerCase()}
                    </Text>
                  </TouchableHighlight>
                );
              })}
          </ScrollView>
        </View>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 400,
    //flex: 0.5,
    width: '90%',
    backgroundColor: 'white',
    minHeight: '35%',
    borderRadius: 30,
    elevation: 5,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 10,
    marginTop: 25,
    display: 'flex',
    flex: 1,
    marginBottom: 25,
    width: '85%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  header: {
    flexDirection: 'row',
  },
  skills: {
    height: '21%',
  },
  description: {
    fontFamily: 'Poppins-Regular',
  },
  singleSkill: {
    padding: 5,
    backgroundColor: BLOND,
    marginRight: 15,
    marginTop: 15,
    marginBottom: 29,
    fontSize: 14,
    borderRadius: 7,
  },
  bio: {
    marginTop: 15,
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
  members: {
    backgroundColor: POLISHED_PINE,
    color: 'white',
  },
  pill: {
    paddingLeft: 5,
    paddingRight: 5,
    fontFamily: 'Poppins-Regular',
  },
});
