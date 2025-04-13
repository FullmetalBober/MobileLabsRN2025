import Constants from 'expo-constants';
import { FlatList, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useState } from 'react';
import Task from '~/components/Task';

type AndroidMode = 'date' | 'time';

const inputStyles = 'h-12 rounded-lg border border-gray-400 bg-white p-2 text-lg';

const oneSignalBaseUrl = 'https://api.onesignal.com/notifications';
const oneSignalAppId = Constants.expoConfig?.extra?.oneSignalAppId;
const oneSignalHeaders = {
  accept: 'application/json',
  Authorization: `Key ${'os_v2_app_r6mdsjx4cvhnjnc5id2qbrsojjzo4qqzsqne7we7bq5cgzapxf2czn25ebddxchgfvlwnh2nklkv4c6vrfjdfku3strs5t4vljzhrta'}`,
  'content-type': 'application/json',
};

export default function Home() {
  const [tasks, setTasks] = useState<
    {
      name: string;
      description: string;
      date: Date;
      messageId: string;
    }[]
  >([]);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<AndroidMode>('date');
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (!selectedDate || event.type === 'dismissed') {
      setShow(false);
      setMode('date');
      return;
    }
    if (mode === 'date') {
      setDate(selectedDate);
      setMode('time');
    } else {
      setDate(selectedDate);
      setShow(false);
      setMode('date');
    }
  };

  const showDatepicker = () => {
    setShow(true);
    setMode('date');
  };

  const onAddTask = async () => {
    const request = await fetch(`${oneSignalBaseUrl}?c=push`, {
      method: 'POST',
      headers: oneSignalHeaders,
      body: JSON.stringify({
        app_id: oneSignalAppId,
        contents: { en: `${name}\n${description}` },
        include_aliases: {
          external_id: ['vt211_mvv'],
        },
        target_channel: 'push',
        send_after: date,
      }),
    });
    const response = await request.json();
    console.log('Response:', response);

    if (response?.id) {
      setTasks((prevTasks) => [
        ...prevTasks,
        {
          name,
          description,
          date: date,
          messageId: response.id,
        },
      ]);
    }

    setName('');
    setDescription('');
    setDate(new Date());
  };
  const onDeleteTask = async (messageId: string) => {
    const req = await fetch(`${oneSignalBaseUrl}/${messageId}?app_id=${oneSignalAppId}`, {
      method: 'DELETE',
      headers: oneSignalHeaders,
    });
    const response = await req.json();
    console.log('Response:', response);

    setTasks((prevTasks) => prevTasks.filter((task) => task.messageId !== messageId));
  };

  return (
    <View className="flex-1 bg-slate-200">
      <SafeAreaView className="m-3 flex-1 gap-3">
        <Text className="text-center text-xl font-bold">To-Do Reminder</Text>
        <TextInput
          className={inputStyles}
          placeholder="Назва"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          className={inputStyles}
          placeholder="Опис"
          value={description}
          onChangeText={setDescription}
        />
        <TouchableOpacity onPress={showDatepicker}>
          <TextInput
            className={inputStyles}
            value={`Обрати час: ${date.toLocaleString()}`}
            editable={false}
          />
        </TouchableOpacity>
        {show && <DateTimePicker value={date} mode={mode} is24Hour={true} onChange={onChange} />}
        <TouchableOpacity onPress={onAddTask} className="rounded-lg bg-green-500 p-3">
          <Text className="text-center text-white">ADD TASK</Text>
        </TouchableOpacity>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.messageId}
          renderItem={({ item }) => (
            <Task
              name={item.name}
              description={item.description}
              date={item.date}
              onDeleteTask={onDeleteTask}
              messageId={item.messageId}
            />
          )}
        />
      </SafeAreaView>
    </View>
  );
}
