#Importing the libraries
import librosa
import soundfile
import os, glob
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import accuracy_score
import pickle
from pydub import AudioSegment
import wave

#Extracting features from monotonic audio files - mfcc, mel, chroma
def extract_feature(file_name,mfcc,chroma,mel):
  with soundfile.SoundFile(file_name) as sound_file:
    X=sound_file.read(dtype="float32")
    sample_rate=sound_file.samplerate
    if chroma:
      stft=np.abs(librosa.stft(X))
    result=np.array([])
    if mfcc:
      mfccs=np.mean(librosa.feature.mfcc(y=X,sr=sample_rate,n_mfcc=40).T,axis=0)
      result=np.hstack((result,mfccs))
    if chroma:
      chromas=np.mean(librosa.feature.chroma_stft(S=stft,sr=sample_rate).T,axis=0)
      result=np.hstack((result,chromas))
    if mel:
      mels=np.mean(librosa.feature.melspectrogram(X,sr=sample_rate).T,axis=0)
      result=np.hstack((result,mels))
    return result

# defining a path variable for stereo and mono differently
path=""
new_wave=wave.open("E:\\1\\uploads\\new.wav")

# if it is a stereo audio file
if(new_wave.getnchannels()==2):
    stereo_audio=AudioSegment.from_file("E:\\1\\uploads\\new.wav")
    # splitting the stereo audio to mono
    mono_audio=stereo_audio.split_to_mono()
    mono_left = mono_audio[0].export("E:\\1\\files\\abc.wav",format="wav")
    mono_right = mono_audio[1].export("E:\\1\\files\\def.wav",format="wav")
    path="E:\\1\\files\\abc1.wav"
else:
    # if it is a mono audio
    path="C:\\Users\\sachi\\www\\audio\\uploads\\new.wav"


#Loading the data received from the user and predicting the output
def load_new_data():
    x,y=[],[]
    for file in glob.glob(path):
        file_name=os.path.basename(file)
        feature=extract_feature(file, mfcc=True, chroma=True, mel=True)
        x.append(feature)
        y.append("")
    return np.array(x),y




xx_test,yy_test=load_new_data()
#Getting the model and accuracy from abcd.pickle file
pickle_off = open("model.pickle","rb")
model,accuracy = pickle.load(pickle_off)

#Predicting the result
yy_pred=model.predict(xx_test)


print(yy_pred[len(yy_pred)-1])
print(" {:.2f}".format(accuracy*100))
