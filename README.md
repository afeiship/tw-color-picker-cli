# tw-color-picker-cli
> Color class picker for tailwind css.

## getting started
```shell
$ tcpc "#E6E8F5" -b # bg-slate-200
$ tcpc "#E6E8F5" -t # text-slate-200
$ tcpc "#E6E8F5"    # slate-200
$ tcpc "#3E3E7C" -b -c './tailwind.config.cjs' -v # with tailwind config file
```

## usage
```shell
$ tcpc -h
Usage: tcpc [options]

Options:
  -V, --version        output the version number
  -v, --verbose        show verbose log
  -t, --is-text        create text color css class
  -b, --is-background  create background color css class
  -h, --help           display help for command
```