import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getLevels,
  selectLevels,
  selectLevelsStatus,
} from '../../store/levelSlice';
import {ILevel, RequestStatus} from '../../data-structures';
import {StyleSheet, Text} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Container} from '../components/Container';
import {Screen} from '../components/Screen';
import {Grid} from '../components/Grid';
import {selectLastAvailableLevel} from '../../store/userSlice';
import {TopBar} from '../components/TopBar';
import {Colors} from '../../style';

type RootStackParamList = {
  Level: {id: string};
};

type LevelNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Level'
>;

interface ILevelsProps {
  navigation: LevelNavigationProp;
}

const Levels: React.FC<ILevelsProps> = (props) => {
  const {navigation} = props;
  const levels: ILevel[] | undefined = useSelector(selectLevels);
  const lastAvailableLevel: number = useSelector(selectLastAvailableLevel);
  const levelsStatus: RequestStatus = useSelector(selectLevelsStatus);
  const isLoading: boolean = levelsStatus === RequestStatus.LOADING;

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getLevels());
  }, []);

  const renderItem = ({item: level}: {item: ILevel; index: number}) => {
    const isDisabled: boolean = level.index > lastAvailableLevel;

    return (
      <Container
        key={level.id}
        style={styles.item}
        onPress={() => navigation.navigate('Level', {id: level.id})}
        isDisabled={isDisabled}
      >
        <Text style={styles.textNumber}>{level.index}</Text>
        <Text style={styles.text}>{`Level`}</Text>
      </Container>
    );
  };

  const onBack = () => navigation.goBack();

  return (
    <Screen>
      <TopBar onBack={onBack} />
      {isLoading ? (
        <ActivityIndicator
          color={Colors.APP_SECONDARY}
          size={100}
          animating={true}
          style={{
            marginTop: 'auto',
            marginBottom: 'auto',
            paddingBottom: 100,
          }}
        />
      ) : (
        <Grid
          items={levels}
          renderItem={renderItem}
          itemStyle={styles.item}
          numColumns={3}
          style={styles.grid}
        />
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'column',
    margin: 15,
    aspectRatio: 0.8,
  },
  textNumber: {
    fontSize: 45,
    color: Colors.TEXT_PRIMARY,
  },
  text: {
    fontSize: 25,
    color: Colors.TEXT_PRIMARY,
  },
  grid: {
    marginHorizontal: 15,
  },
});

export {Levels};
