import flatpickr from 'flatpickr';
import { Japanese } from 'flatpickr/dist/l10n/ja';
import { Vietnamese } from 'flatpickr/dist/l10n/vn';
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect';

export default {
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: [String, Date],
      default: '',
    },
    calendarButton: {
      type: Boolean,
      default: true,
    },
    clearButton: {
      type: Boolean,
      default: true,
    },
    defaultDate: {
      type: String,
      default: null,
    },
    defaultHour: {
      type: Number,
      default: new Date().getHours(),
    },
    defaultMinute: {
      type: Number,
      default: new Date().getMinutes(),
    },
    enableTime: {
      type: Boolean,
      default: false,
    },
    /**
         * d    Day of the month, 2 digits with leading zeros    01 to 31
         * D    A textual representation of a day    Mon through Sun
         * l (lowercase 'L')    A full textual representation of the day of the week    Sunday through Saturday
         * j    Day of the month without leading zeros    1 to 31
         * J    Day of the month without leading zeros and ordinal suffix    1st, 2nd, to 31st
         * w    Numeric representation of the day of the week    0 (for Sunday) through 6 (for Saturday)
         * W    Numeric representation of the week    0 (first week of the year) through 52 (last week of the year)
         * F    A full textual representation of a month    January through December
         * m    Numeric representation of a month, with leading zero    01 through 12
         * n    Numeric representation of a month, without leading zeros    1 through 12
         * M    A short textual representation of a month    Jan through Dec
         * U    The number of seconds since the Unix Epoch    1413704993
         * y    A two digit representation of a year    99 or 03
         * Y    A full numeric representation of a year, 4 digits    1999 or 2003
         * Z    ISO Date format    2017-03-04T01:23:43.000Z
         * H    Hours (24 hours)    00 to 23
         * h    Hours    1 to 12
         * G    Hours, 2 digits with leading zeros    1 to 12
         * i    Minutes    00 to 59
         * S    Seconds, 2 digits    00 to 59
         * s    Seconds    0, 1 to 59
         * K    AM/PM    AM or PM
         * You may escape formatting tokens using \\. (ex: dateFormat: "Y-m-d\\Z", // Displays: 2017-01-22Z)
         */
    dateFormat: {
      type: String,
      default: 'Y-m-d',
    },
    minDate: {
      type: String,
      default: null, // access 'today'
    },
    maxDate: {
      type: String,
      default: null,
    },
    time_24hr: {
      type: Boolean,
      default: true,
    },
    locale: {
      type: String,
      default: 'ja',
    },
    placeholder: {
      type: String,
      default: '',
    },
    position: {
      type: String,
      default: 'auto',
    },
    allowInput: {
      type: Boolean,
      default: true,
    },
    monthSelect: {
      type: Boolean,
      default: false,
    },
    tpl: {
      type: String,
      default: 'bulma',
    },
    getOriginalDate: {
      type: Boolean,
      default: false
    },
    dropIcon: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    fp: null,
    selectDate: null,
    originalDate: ''
  }),
  watch: {
    /* value: function (vl) {
            console.log(vl)
        } */
    minDate(vl) {
      this.setConfig('minDate', vl);
    },
    maxDate(vl) {
      this.setConfig('maxDate', vl);
    },
  },
  mounted() {
    let locale = null;
    if (this.locale === 'vi') locale = Vietnamese;
    if (this.locale === 'ja') locale = Japanese;

    this.selectDate = this.value;
    const icon = this.$el.querySelector('.icon-drop')
    const config = {
      dateFormat: this.dateFormat,
      defaultDate: this.defaultDate,
      defaultMinute: this.defaultMinute,
      enableTime: this.enableTime,
      minDate: this.minDate,
      maxDate: this.maxDate,
      time_24hr: this.time_24hr,
      position: this.position,
      allowInput: this.allowInput,
      onChange: (selectedDates, dateStr, instance) => {
        this.originalDate = selectedDates
        this.selectDate = dateStr;
        if (!this.enableTime) instance.close();
      },
      onOpen: (selectedDates, dateStr, instance) => {
        icon.classList.add('icon-rotate')
        instance.setDate(this.value);
      },
      onClose: () => {
        icon.classList.remove('icon-rotate')
      },
    };

    if (this.monthSelect) {
      config.plugins = [
        new monthSelectPlugin({
          shorthand: false,
          dateFormat: this.dateFormat,
          altFormat: this.dateFormat,
          theme: 'light',
        }),
      ];
    }

    if (this.calendarButton || this.clearButton) config.wrap = true;

    if (this.locale) config.locale = locale;

    this.$nextTick(() => {
      this.fp = flatpickr(this.$el, config);
    });
  },
  methods: {
    setConfig(option, value) {
      // console.log('>> ' + option + ' = ' + value)
      if (this.fp) this.fp.set(option, value);
    },
    inputChange($event) {
      const { value } = $event.target;
      this.$nextTick(() => {
        if(this.getOriginalDate) {
          this.$emit('change', this.originalDate);
        }
        else {
          this.$emit('change', value);
        }
      });
    },
  },
  beforeDestroy() {
    if (this.fp) this.fp.destroy();
  },
};
