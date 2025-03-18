import React, {useCallback, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Matrix, Refresh} from '../components';
import {NumberBoard} from '../components/NumberBoard';
import {useDispatch, useSelector} from 'react-redux';
import {
  checkIsSolved,
  getLevel,
  selectLevel,
  selectLevelStatus,
} from '../../store/levelSlice';
import {ActivityIndicator} from 'react-native-paper';
import {TopBar} from '../components/TopBar';
import {Win} from '../components/Win';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Screen} from '../components/Screen';
import {changeLastAvailableLevel} from '../../store/userSlice';
import {ILevel, RequestStatus} from '../../data-structures';
import {Colors} from '../../style';

type RootStackParamList = {
  Level: {id: string};
};

type LevelRouteProp = RouteProp<RootStackParamList, 'Level'>;
type LevelNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Level'
>;

interface ILevelProps {
  route: LevelRouteProp;
  navigation: LevelNavigationProp;
}

const Level = (props: ILevelProps) => {
  const {navigation, route} = props;
  const dispatch = useDispatch<any>();
  const isSolved = useSelector(checkIsSolved);
  const activeLevel: ILevel | null = useSelector(
    selectLevel,
    (level1, level2) => level1?.id === level2?.id
  );
  const levelStatus: RequestStatus = useSelector(selectLevelStatus);
  const isLoading: boolean = levelStatus === RequestStatus.LOADING;

  useEffect(() => {
    dispatch(getLevel(route.params.id));
  }, []);

  useEffect(() => {
    if (isSolved) {
      dispatch(changeLastAvailableLevel(activeLevel?.index || 0));
    }
  }, [isSolved]);

  const onBack = () => navigation.goBack();

  const onReset = useCallback(() => {
    activeLevel && dispatch(getLevel(activeLevel?.id));
  }, [activeLevel]);

  return (
    <Screen style={styles.level}>
      <TopBar onBack={onBack}>
        <Button icon={<Refresh width={40} height={40} />} onPress={onReset} />
      </TopBar>
      {isSolved ? (
        <Win />
      ) : isLoading ? (
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
        <>
          <Matrix />
          <NumberBoard />
        </>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  level: {
    // alignSelf: 'stretch',
    alignItems: 'center',
  },
});

export {Level};
