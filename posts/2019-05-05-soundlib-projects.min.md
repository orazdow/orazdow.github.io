#### SoundLib

This project is the start of what is to be an audio programming environment. SoundLib is just a working title, currently it's a library of objects for dsp and control.

***

The main audio base-class **Sig** should provide everything needed to incorporate classes from other libraries like Stk or Maximilian:

**variables:** 
```float* inputs[num_inlets]``` (default is 64)
```float* input``` (same as inputs[0])
```float output```
```float val``` provided to store 1 intial value

**Functions:**

**-init:**
```void init(uint _inlets = 1, bool _summing = auto_summing)``` sets number of active inlets, toggles summing
-Each inlet is itself a summing-bus with a max of 64 parralel inputs.
-This can be overriden in which case each inlet is mapped directly to the summing input, 
-otherwise each of the 64 inlets ```inputs[...]``` is mapped to a summing output.
```void initVal(float* val, int inlet)``` points an inlet to any existing float
```void setVal(float f, int inlet = 1)``` assigns a value to val and points an inlet to it

**-constructors:**
```Sig(double val = 0)``` (truncates to float)
```Sig(uint inlets, bool summing)``` construct with n inlets, summing

**-dsp:**
```virtual void dsp()``` this is where a child class should implement it's dsp routine
```virtual float out()``` these can be implemented to add dsp called by the user instead of being iniked by the library
```virtual float out(double in)```

**-connecting:**
```void connect(Sig* child, uint inlet = 0)``` adds a child object to the Sig graph, disconnecting it from the root node, and connect's a's output to b's input at a specified inlet.
```void disconnect(Sig* child, uint inlet = 0)``` disconnects, and will reconnect b to the root node if neccesary.

These call external ```sig_connect```/```sig_disconect``` functions which also include 
```sig_connect(float* a, Sig* b, uint inlet = 0)``` which will connect (or remove) any float* to an inlet 

**-others:**
```void Call()``` this is calls dsp() and sumInputs() if summing, and is called by the dsp scheduler
```virtual void bypass_summing(uint inlet = 0)``` this called by Connect/disconnect
```void sumInputs()```

Here is an example:

	// 2-inlet sum (like +~ in PD)
   	class Sum : public Sig{
    public:
        Sum(double f = 0){
            init(2); // 2 inlets
            setVal(f, 1); // set default val to right inlet
        }
        
        void dsp(){ 
            output = *inputs[0];
            output += *inputs[1];
        }
    };

***

the base class for control objects is **Ctl**. Control messages have a simple structure currently and all message sources are polling to generate messages, Events and a different message protocol of some kind will be incorporated. 

The Msg struct has an int for number of Vals, a type field, an index that can be set by the caller, and an array of n Vals. Val is a union that can take on float int or note struct types. Depending on how parameters are parsed and from protocols like midi, osc or fudi this will likely change.

Ctl provides a member Msg, and the following functions:

```virtual void run(Msg _m){}``` this is the control equivalent of dsp() in Sig.

```virtual void run(){}```

```virtual void onConnect(Ctl* child){}``` 

```void msg_alloc(size_t num)``` this must be called to allocate the contents of a message

```void copy_msg(Msg _m)``` copy the contents of an incoming message

***

Sig objects are in soundlib_sig.h and expr.h, which is an audio expression parser like pd's expr~ with the variables f0-f63 corresponding to it's inlets. Ctl objects are in soundlib_ctl.h.